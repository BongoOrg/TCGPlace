import { Injectable } from '@angular/core';
import {INVOICE_URL} from "../../../../../../config";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {SalePostModel} from "../../../../core/models/sale-post.model";
import {OrderModel} from "../../../../core/models/order.model";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiURL = INVOICE_URL;
  private selectedTransactionSource = new BehaviorSubject<OrderModel | null>(null);
  selectedTransaction$ = this.selectedTransactionSource.asObservable();
  constructor(private httpClient : HttpClient) { }

  getBuyerTransaction(buyerId : number): Observable<HttpResponse<OrderModel[]>>{
    var params = new HttpParams()
    params = params.append('buyerId', buyerId);
    return this.httpClient.get<OrderModel[]>(`${this.apiURL}/Order/transaction/buyer`,{params : params,observe: 'response'})
  }

  getSellerTransaction(sellerId : number): Observable<HttpResponse<OrderModel[]>>{
    var params = new HttpParams()
    params = params.append('sellerId', sellerId);
    return this.httpClient.get<OrderModel[]>(`${this.apiURL}/Order/transaction/seller`,{params : params,observe: 'response'})
  }
  getBuyedTransactionDetail(orderId : number): Observable<HttpResponse<OrderModel>>{
    return this.httpClient.get<OrderModel>(`${this.apiURL}/Order/transaction/buyer/${orderId}`, {observe: 'response'})
  }

  getSelledTransactionDetail(orderId : number): Observable<HttpResponse<OrderModel>>{
    return this.httpClient.get<OrderModel>(`${this.apiURL}/Order/transaction/seller/${orderId}`, {observe: 'response'})
  }

}
