import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common'
import {combineLatest, concat, filter, map, Observable, of, ReplaySubject, Subject, switchMap, take, tap} from "rxjs";
import {PokemonItemReferenceModel} from "../../../core/models/pokemon-item-reference.model";
import {SalePostModel} from "../../../core/models/sale-post.model";
import {UserService} from "../../../core/services/UserService/user.service";
import {ActionSheetController, ModalController} from '@ionic/angular';
import { FullScreenImageComponent } from 'src/app/core/components/full-screen-image/full-screen-image.component';
import { FullScreenImageSliderComponent } from 'src/app/core/components/full-screen-image-slider/full-screen-image-slider.component';
import {PaymentComponent} from "../payment/payment.component";
import {SalePostService} from "../services/sale-post.service";
import {LikedSalePostService} from "../../../core/services/LikedSalePostService/liked-sale-post.service";
import {ToastService} from "../../../core/services/toast.service";

@Component({
  selector: 'app-view-sale-post',
  templateUrl: './view-sale-post.component.html',
  styleUrls: ['./view-sale-post.component.scss']
})
export class ViewSalePostComponent {
  SalePost$:Observable<SalePostModel | null> = of(new SalePostModel())
  UserSalePost$:Observable<SalePostModel[] | null> = of([])
  @Input() paramSearchPostId:string = '';

  constructor(private salePostService:SalePostService,
              private route:ActivatedRoute,
              private modalCtrl: ModalController,
              private userService:UserService,
              private router:Router,
              private renderer: Renderer2,
              private location: Location,
              private  likedSalePostService:LikedSalePostService,
              private actionSheetCtrl: ActionSheetController,
              private toastService: ToastService) {
  }
  loading: boolean = true;
  loadingLike: boolean = false;
  isDisabled:boolean = true;
  isOwner: boolean = false;
  searchPostId: string = this.route.snapshot.params['id'];

  accessToken = localStorage.getItem('access_token');
  private userId$ = new ReplaySubject<number>();

  ngOnInit() {

        if(this.searchPostId === undefined){
          this.searchPostId = this.paramSearchPostId
        }

    this.userId$.pipe(take(1)).subscribe(userId => {
      this.DefineOwner(userId);
      this.initUserSalePost$();
    });

    this.SalePost$ = this.salePostService.getSingleSalePost(this.searchPostId).pipe(
      filter((value) => value !== null),
      tap(_ => this.loading = false),
      map(response => response.body),
      tap(resp => this.userId$.next(resp!.userId))
    );
  }

  initUserSalePost$() {
    this.UserSalePost$ = this.userId$.pipe(
      switchMap(userId => this.salePostService.getSomeSalePostForUser(userId, 5)),
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

  async openFullscreenImage(imageUrl: string) {
    const modal = await this.modalCtrl.create({
      component: FullScreenImageComponent,
      componentProps: {
        imageUrl: imageUrl
      }

    });

    return await modal.present();
  }

  async openFullscreenSlider(salePostPictureReference: string, salePostPictures: string[]) {
    const modal = await this.modalCtrl.create({
      component: FullScreenImageSliderComponent,
      componentProps: {
        imageReference: salePostPictureReference,
        images: salePostPictures
      }

    });

    return await modal.present();
  }

  async openModulePayment(post : SalePostModel) {
    const modal = await this.modalCtrl.create({
      component: PaymentComponent,
      componentProps: {
        post: post
      }
    });
    return await modal.present();
  }
  redirectToProfile(userId: number) {
    this.router.navigateByUrl(`/tabs/profil/${userId}`)
  }

  switchIsPublic() {
    if (this.accessToken !== null) {
      this.salePostService.switchIsPublic((this.route.snapshot.params['id']), this.accessToken).subscribe(() => {
        this.renderer.setProperty(window, 'location', this.router.url); //refresh la page
      });
    }
  }

  async deleteSalePost(id: string) {
    const confirm = await this.canDismiss();
    if (confirm) {
      this.salePostService.deleteSalePost(id).subscribe(() => {
        this.location.back()
      })
    }
  }

  redirectToOfferPage(idSalePost: string){
    this.router.navigateByUrl(`/tabs/store/sale/offer/${idSalePost}` );
  }

  LikeSalePost(id: string, event: MouseEvent) {
    this.loadingLike = true;
    event.stopPropagation();
    this.likedSalePostService.LikeSalePost(id).pipe(
      switchMap(_ => this.salePostService.getSingleSalePost(this.route.snapshot.params['id'])),
      filter((value) => value !== null),
      tap(_ => this.loadingLike = false),
      map(response => response.body),
      tap(resp => this.userId$.next(resp!.userId)),
    ).subscribe(salePost => this.SalePost$ = of(salePost));
  }

  UnlikeSalePost(id: string, event: MouseEvent) {
    this.loadingLike = true;
    event.stopPropagation();
    this.likedSalePostService.UnLikeSalePost(id).pipe(
      switchMap(_ => this.salePostService.getSingleSalePost(this.route.snapshot.params['id'])),
      filter((value) => value !== null),
      tap(_ => this.loadingLike = false),
      map(response => response.body),
      tap(resp => this.userId$.next(resp!.userId)),
    ).subscribe(salePost => this.SalePost$ = of(salePost));
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

  notAvailable() {
    this.toastService.presentToastNotAvailable();
  }
}
