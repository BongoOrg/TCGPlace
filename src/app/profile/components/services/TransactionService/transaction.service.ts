import { Injectable } from '@angular/core';
import {INVOICE_URL} from "../../../../../../config";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {SalePostModel} from "../../../../core/models/sale-post.model";
import {OrderModel} from "../../../../core/models/order.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiURL = INVOICE_URL;

  constructor(private httpClient : HttpClient) { }

  getBuyerTransaction(buyerId : number): Observable<HttpResponse<OrderModel[]>>{
    var params = new HttpParams()
    params = params.append('buyerId', buyerId);
    return this.httpClient.get<OrderModel[]>(`${this.apiURL}/Order`,{params : params,observe: 'response'})
  }
}
