import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShippingOrder } from '../models/shipping.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  private baseUrl = 'http://localhost:8080/shipping';

  constructor(private http: HttpClient) {}

  getAllShippingOrders(): Observable<ShippingOrder[]> {
    return this.http.get<ShippingOrder[]>(this.baseUrl);
  }

  createShippingOrder(order: ShippingOrder): Observable<ShippingOrder> {
    return this.http.post<ShippingOrder>(this.baseUrl, order);
  }
}
