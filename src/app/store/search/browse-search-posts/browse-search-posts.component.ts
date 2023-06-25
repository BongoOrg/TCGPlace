import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {SearchPostModel} from "../../../core/models/search-post.model";
import {BehaviorSubject, filter, map, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {SearchPostService} from "../services/search-post.service";
import {ExtensionModel} from "../../../home/components/extension-card-slider/models/extension.model";
import {GradingModel} from "../../../core/models/grading.model";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {HttpResponse} from "@angular/common/http";
import {SalePostModel} from "../../../core/models/sale-post.model";

@Component({
  selector: 'app-browse-search-posts',
  templateUrl: './browse-search-posts.component.html',
  styleUrls: ['./browse-search-posts.component.scss'],
})
export class BrowseSearchPostsComponent implements OnInit {
  @Input() idReference!:string | undefined
  @Input() extensions!:ExtensionModel[] | undefined
  @Input() gradings!:GradingModel[] | undefined
  @Input() idUser!: string | undefined

  loading:boolean = true;
  currentPage : number = 1
  SearchPostlist : SearchPostModel[] = []
  skeletons = [0,0,0,0]

  private subscription: Subscription = new Subscription();
  private idReferenceSubject = new BehaviorSubject<string | undefined>(undefined);


  constructor(private searchPostService:SearchPostService) {
    /*this.searchPosts$ = this.idReferenceSubject.pipe(
      switchMap(id => this.searchPostService.getPublicSearchPosts(this.idReference, this.extensions, this.gradings)), // Exécute une nouvelle requête à chaque changement
      tap(_ => this.loading = false),
      map(response => response.body)
    ); */
  }

  ngOnInit() {
    this.subscription.add(
      this.idReferenceSubject.pipe(
        switchMap(() => this.getSearch())
      ).subscribe()
    );
    this.idReferenceSubject.next(this.idReference);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  getSearch(): Observable<HttpResponse<SearchPostModel[]>> {
    return this.searchPostService.getPublicSearchPosts(this.idReference, this.extensions, this.gradings, this.idUser, this.currentPage).pipe(
      tap(val => {
        this.loading = false
        if(val.body !== null){
          this.SearchPostlist = this.SearchPostlist.concat(val.body);
        }
      }),
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['idReference'] && !changes['idReference'].isFirstChange()) {
      this.currentPage = 1;
      this.SearchPostlist = [];
      this.loading = true;
      this.idReferenceSubject.next(changes['idReference'].currentValue);
    }
    if (changes['extensions'] && !changes['extensions'].isFirstChange()) {
      this.currentPage = 1;
      this.SearchPostlist = [];
      this.loading = true;
      this.idReferenceSubject.next(changes['extensions'].currentValue);
    }
    if (changes['gradings'] && !changes['gradings'].isFirstChange()) {
      this.currentPage = 1;
      this.SearchPostlist = [];
      this.loading = true;
      this.idReferenceSubject.next(changes['gradings'].currentValue);
    }
  }

}
