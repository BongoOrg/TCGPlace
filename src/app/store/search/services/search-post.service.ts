import {Injectable} from "@angular/core";
import {SearchPostModel} from "../../../core/models/search-post.model";
import {Observable, map} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {POST_URL} from "../../../../../config";
import {ExtensionModel} from "../../../home/components/extension-card-slider/models/extension.model";
import {GradingModel} from "../../../core/models/grading.model";

@Injectable()

export class SearchPostService{
  constructor(private http: HttpClient) {}
  private apiURL = POST_URL;

  getPublicSearchPosts(idReference:string | undefined = "null",
                       extensions:ExtensionModel[] | undefined = undefined,
                       gradings:GradingModel[] | undefined = undefined,
                       idUser:string | undefined = undefined,
                       pageNumber: number = 1,
                       pageSize: number = 10): Observable<HttpResponse<SearchPostModel[]>>{

    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    let idExtensions = extensions?.map(extension => extension.id)
    let stringExtensions = idExtensions?.toString()
    stringExtensions == '' ? stringExtensions = undefined : stringExtensions;

    let idGradings = gradings?.map(grading => grading.id)
    let stringGradings = idGradings?.toString()
    stringGradings == '' ? stringGradings = undefined : stringGradings;

    return this.http.get<SearchPostModel[]>(`${this.apiURL}/SearchPost/public?idReference=${idReference}&idExtensions=${stringExtensions}&idGradings=${stringGradings}&idUser=${idUser}`,
      {params : params, observe: 'response'})
  }

  getSingleSearchPost(id:any): Observable<HttpResponse<SearchPostModel>>{
    return this.http.get<SearchPostModel>(`${this.apiURL}/SearchPost/${id}`,{observe: 'response'})
  }

  getSomeSearchPostForUser(userId:number, nbMax:number): Observable<HttpResponse<SearchPostModel[]>>{
    return this.http.get<SearchPostModel[]>(`${this.apiURL}/SearchPost/user/${userId}/${nbMax}`,{observe: 'response'})
  }

  switchIsPublic(searchPostId: any, token:string): Observable<HttpResponse<any>> {
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.put<any>(`${this.apiURL}/SearchPost/public/${searchPostId}`, {headers, observe: 'response' });
  }

  deleteSearchPost(searchPostId:string):Observable<HttpResponse<any>>{
    return this.http.delete<any>(`${this.apiURL}/SearchPost/${searchPostId}`, {observe: 'response' });
  }
}
