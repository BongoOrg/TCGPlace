import {Component, ViewChild, OnDestroy, SimpleChanges} from '@angular/core';
import {InfiniteScrollCustomEvent, IonContent, ModalController} from "@ionic/angular";
import {Router} from "@angular/router";
import {PokemonItemReferenceModel} from "../core/models/pokemon-item-reference.model";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap
} from "rxjs";
import {SearchReferenceComponent} from "./add-reference-post/search-reference/search-reference.component";
import {SearchService} from "../core/services/SearchService/search.service";
import {ItemSearchResponseModel} from "../core/models/item-search-response.model";
import {FilterModalComponent} from "../core/components/filter-modal/filter-modal.component";
import {ExtensionModel} from "../home/components/extension-card-slider/models/extension.model";
import {SalePostModel} from "../core/models/sale-post.model";
import {ItemModel} from "../core/models/item.model";
import {HttpResponse} from "@angular/common/http";
import {AddReferencePostComponent} from "./add-reference-post/add-reference-post.component";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnDestroy {
  @ViewChild(IonContent) content!: IonContent;
  @ViewChild(SearchReferenceComponent) searchComponent!: SearchReferenceComponent;
  @ViewChild(AddReferencePostComponent) addComponent!: AddReferencePostComponent;


  private unsubscribe$ = new Subject<void>();
  public loading: boolean = true;
  currentPage : number = 0
  keepList:boolean = false;

  public searchResults$!: Observable<PokemonItemReferenceModel[]>
  selectedExtensions!:ExtensionModel[] | undefined

  searchedReferencesList : PokemonItemReferenceModel[] = []

  private subscription: Subscription = new Subscription();

  constructor(private router:Router, private searchService:SearchService, private modalCtrl: ModalController) {
  }

  saleSelected = true;

  ngAfterViewInit() {
    this.subscription.add(
      this.searchComponent.valueSubject.pipe(
        takeUntil(this.unsubscribe$),
        startWith(''),
        debounceTime(500),
        switchMap(value => this.searchReferences(value)),
      ).subscribe()
    );
    this.searchComponent.valueSubject.next('');
  }

  onIonInfinite(ev : any) {
    this.currentPage++;
    setTimeout(() => {
      if(ev !== null) {
        (ev as InfiniteScrollCustomEvent).target.complete();
      }
      this.keepList = true;
      this.searchComponent.valueSubject.next(this.searchComponent.searchValue);
    }, 1000);
  }

  searchReferences(value:string): Observable<HttpResponse<PokemonItemReferenceModel[]>>{
    if(!this.keepList){ this.loading = true; this.currentPage = 0 }else{
    }
      return this.searchService.SearchReference(value, this.selectedExtensions, this.currentPage).pipe(
        tap(val => {
          this.loading = false
          if(val.body !== null){
            if(!this.keepList){
              this.searchedReferencesList = val.body;
            }else{
              this.keepList = false;
              this.searchedReferencesList = this.searchedReferencesList.concat(val.body);
            }
          }
        }),
      )
  }



  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  scrollToTop() {
    this.content.scrollToTop(500);
  }

  redirectToAddPost($event: string) {
    if(!this.saleSelected){
      this.router.navigateByUrl(`/tabs/add/search/${$event}`)
    }
    else{
      this.router.navigateByUrl(`/tabs/add/sale/${$event}`)
    }
  }

  unSelectExtension(extension: ExtensionModel) {
    this.selectedExtensions = this.selectedExtensions?.filter(ex => ex.id !== extension.id)
  }

    async openModal() {
      const modalSale = await this.modalCtrl.create({
        component: FilterModalComponent,
        componentProps:{
          'isReference': true
        }
      });
      await modalSale.present();
      const { data, role } = await modalSale.onDidDismiss();

      if (role === 'confirm') {
        this.selectedExtensions = data['extensions'];
  }
}
}
