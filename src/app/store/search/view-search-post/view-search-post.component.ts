import {Component, Renderer2} from '@angular/core';
import {SearchPostService} from "../services/search-post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchPostModel} from "../../../core/models/search-post.model";
import {filter, map, Observable, of, ReplaySubject, switchMap, take, tap} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {UserService} from "../../../core/services/UserService/user.service";
import {Location} from "@angular/common";
import {ActionSheetController, ModalController} from "@ionic/angular";
import {LikedSearchPostService} from "../../../core/services/LikedSearchPostService/liked-search-post.service";
import {FilterModalComponent} from "../../../core/components/filter-modal/filter-modal.component";
import {AddSalePostComponent} from "../../../add-post/add-sale-post/add-sale-post.component";

@Component({
  selector: 'app-view-search-post',
  templateUrl: './view-search-post.component.html',
  styleUrls: ['./view-search-post.component.scss']
})
export class ViewSearchPostComponent {

  SearchPost$:Observable<SearchPostModel | null> = of(new SearchPostModel())
  UserSearchPost$:Observable<SearchPostModel[] | null> = of([])
  loading: boolean = true;
  public loadingLike: boolean = false;
  constructor(private searchPostService:SearchPostService,
              private route:ActivatedRoute,
              private userService:UserService,
              private router:Router,
              private renderer: Renderer2,
              private location: Location,
              private  likedSearchPostService:LikedSearchPostService,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,) {

  }

  isDisabled:boolean = true;
  isOwner: boolean = false;
  searchPostId: string = this.route.snapshot.params['id'];

  accessToken = localStorage.getItem('access_token');

  private userId$ = new ReplaySubject<number>();


  ngOnInit() {
    /* this.SearchPost$ = this.searchPostService.getSingleSearchPost(this.route.snapshot.params['id']).pipe(
       filter((value) => value !== null),
       tap(_ => this.loading = false),
       map(response => response.body),
     )
     const userID = this.userService.GetCurrentUserID()
     this.UserSearchPost$ = this.searchPostService.getSomeSearchPostForUser(userID, 5).pipe(
       filter((value) => value !== null),
       tap(_ => this.loading = false),
       map(response => response.body),) */

    this.userId$.pipe(take(1)).subscribe(userId => {
      this.DefineOwner(userId);
      this.initUserSearchPost$();
    });

    this.SearchPost$ = this.searchPostService.getSingleSearchPost(this.route.snapshot.params['id']).pipe(
      filter((value) => value !== null),
      tap(_ => this.loading = false),
      map(response => response.body),
      tap(resp => this.userId$.next(resp!.userId))
    );
  }

  initUserSearchPost$() {
    this.UserSearchPost$ = this.userId$.pipe(
      switchMap(userId => this.searchPostService.getSomeSearchPostForUser(userId, 5)),
      filter((value) => value !== null),
      tap(_ => this.loading = false),
      map(response => response.body),
    );
  }
  DefineOwner(userId:number){
    let currentUserId = this.userService.GetCurrentUserID()
    if(currentUserId == userId){
      this.isOwner = true;
    }else{
      this.isOwner = false;
    }
  }

  ngOnDestroy() {
    this.userId$.complete();
  }

  redirectToPaymentModule() {
    this.router.navigateByUrl(`/payment`)
  }

  switchIsPublic() {
    if (this.accessToken !== null) {
      this.searchPostService.switchIsPublic((this.route.snapshot.params['id']), this.accessToken).subscribe(() => {
        this.renderer.setProperty(window, 'location', this.router.url); //refresh la page
      });
    }
  }

  async deleteSearchPost(id: string) {
    const confirm = await this.canDismiss();
    if (confirm) {
      this.searchPostService.deleteSearchPost(id).subscribe(() => {
        this.location.back()
      })
    }
  }

  LikeSearchPost(id: string, event: MouseEvent) {
    this.loadingLike = true;
    event.stopPropagation();
    this.likedSearchPostService.LikeSearchPost(id).pipe(
      switchMap(_ => this.searchPostService.getSingleSearchPost(this.route.snapshot.params['id'])),
      filter((value) => value !== null),
      tap(_ => this.loadingLike = false),
      map(response => response.body),
      tap(resp => this.userId$.next(resp!.userId)),
    ).subscribe(searchPost => this.SearchPost$ = of(searchPost));
  }

  UnlikeSearchPost(id: string, event: MouseEvent) {
    this.loadingLike = true;
    event.stopPropagation();
    this.likedSearchPostService.UnLikeSearchPost(id).pipe(
      switchMap(_ => this.searchPostService.getSingleSearchPost(this.route.snapshot.params['id'])),
      filter((value) => value !== null),
      tap(_ => this.loadingLike = false),
      map(response => response.body),
      tap(resp => this.userId$.next(resp!.userId)),
    ).subscribe(searchPost => this.SearchPost$ = of(searchPost));
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  canDismiss = async () => {
    const actionSheet = await this.actionSheetCtrl.create({
      mode: 'ios',
      header: 'Êtes vous sûr ?',
      buttons: [
        {
          text: 'Oui',
          role: 'confirm',
        },
        {
          text: 'Non',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    return role === 'confirm';
  };

  async OpenAddSalePost(searchPost:SearchPostModel) {
    const modalSale = await this.modalCtrl.create({
      component: AddSalePostComponent,
      componentProps:{
        idBuyer: searchPost.userId,
        searchPost: searchPost,
      }
    });
    await modalSale.present();
    const { data, role } = await modalSale.onDidDismiss();
  }
}
