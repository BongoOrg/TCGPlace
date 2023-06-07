import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {SalePostModel} from "../../../core/models/sale-post.model";
import {ItemModel} from "../../../core/models/item.model";
import {PictureModel} from "../../../core/models/picture.model";
import { Router } from '@angular/router';
import {SalePostService} from "../services/sale-post.service";
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  scan,
  Subscription,
  switchMap,
  tap,
  throwError
} from "rxjs";
import {SearchPostModel} from "../../../core/models/search-post.model";
import {da, ta, th} from "date-fns/locale";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {ExtensionModel} from "../../../home/components/extension-card-slider/models/extension.model";
import {GradingModel} from "../../../core/models/grading.model";
import {ErrorStateService} from "../../../core/services/error-state.service";

@Component({
  selector: 'app-browse-sale-posts',
  templateUrl: './browse-sale-posts.component.html',
  styleUrls: ['./browse-sale-posts.component.scss'],
})
export class BrowseSalePostsComponent implements OnInit, OnDestroy {
  @Input() idReference!:string | undefined
  @Input() extensions!: ExtensionModel[] | undefined
  @Input() gradings!: GradingModel[] | undefined
  @Input() idUser!: string | undefined



  pictures: PictureModel[] = []
  isLoading : boolean = true
  currentPage : number = 1
  list : SalePostModel[] = []

  private subscription: Subscription = new Subscription();
  private idReferenceSubject = new BehaviorSubject<string | undefined>(undefined);
  private errorSubscription!: Subscription;
  errorOccurred: boolean = false;

  constructor(private router:Router, private saleService : SalePostService, private errorStateService: ErrorStateService) { }
  ngOnInit() {

    this.errorSubscription = this.errorStateService.errorState$.subscribe(
      errorState => {
        this.errorOccurred = errorState;
      }
    );

    this.subscription.add(
      this.idReferenceSubject.pipe(
        switchMap(() => this.getSales()),
      ).subscribe()
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idReference'] && !changes['idReference'].isFirstChange()) {
      this.isLoading = true;
      this.currentPage = 1;
      this.list = [];
      this.idReferenceSubject.next(changes['idReference'].currentValue);
    }else{
      if (changes['extensions'] && !changes['extensions'].isFirstChange()) {
        this.isLoading = true;
        this.currentPage = 1;
        this.list = [];
        this.idReferenceSubject.next(changes['extensions'].currentValue);
      }else{
        if (changes['gradings'] && !changes['gradings'].isFirstChange()) {
          this.isLoading = true;
          this.currentPage = 1;
          this.list = [];
          this.idReferenceSubject.next(changes['gradings'].currentValue);
        }
      }
    }


  }

  onIonInfinite(ev : any) {
    this.currentPage++;
    setTimeout(() => {
      if(ev !== null) {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }
      this.idReferenceSubject.next(this.idReference);
    }, 1000);
  }

  getSales(): Observable<HttpResponse<SalePostModel[]>> {
    return this.saleService.getPublicSalePosts(this.idReference, this.extensions, this.gradings,this.idUser,  this.currentPage, ).pipe(
      tap(val => {
        this.isLoading = false
        if(val.body !== null){
          this.list = this.list.concat(val.body);
        }
      })
    )
  }

  redirectToAddPost(sale_post_id: string) {
    this.router.navigateByUrl(`/tabs/store/sale/view/${sale_post_id}`);
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.isLoading = true;
      this.currentPage = 1;
      this.list = [];
      this.idReferenceSubject.next(this.idReference);
      event.target.complete();
    }, 0);
  }

  refresh() {
    this.errorStateService.setErrorState(false)
    this.isLoading = true;
    this.currentPage = 1;
    this.list = [];
    this.idReferenceSubject.next(this.idReference);
  }
}


