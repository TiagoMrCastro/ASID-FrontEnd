import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderRequest } from '../models/create-order-model';
import { OrderDetailsResponse } from '../models/order-history.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  createOrder(data: CreateOrderRequest): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  getOrderHistory(userId: number, from: string, to: string): Observable<OrderDetailsResponse[]> {
    return this.http.get<OrderDetailsResponse[]>(
      `http://localhost:8080/history/${userId}/details?from=${from}&to=${to}`
    );
  }
}
