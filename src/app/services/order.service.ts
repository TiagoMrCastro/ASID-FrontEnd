import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateOrderRequest } from '../models/create-order-model';
import { CreateOrderSaga } from '../models/order.model';
import { OrderDetailsResponse } from '../models/order-history.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiHost = 'http://localhost:8080';
  private readonly ordersUrl = `${this.apiHost}/orders`;
  private readonly sagaUrl = `${this.apiHost}/saga/orders`;
  private readonly historyUrl = `${this.apiHost}/history`;
  private readonly compositionUrl = `${this.apiHost}/order`;

  constructor(private http: HttpClient) {}

  // Criar encomenda padrão
  createOrder(data: CreateOrderRequest): Observable<any> {
    return this.http.post(this.ordersUrl, data);
  }

  // Criar encomenda via Saga
  createOrderSaga(data: CreateOrderSaga): Observable<HttpResponse<string>> {
    return this.http.post(this.sagaUrl, data, {
      observe: 'response',
      responseType: 'text' as const
    });
  }

  // Histórico detalhado do utilizador CQRS
  getOrderHistory(userId: number, from: string, to: string): Observable<OrderDetailsResponse[]> {
    return this.http.get<OrderDetailsResponse[]>(`${this.historyUrl}/${userId}/details`, {
      params: { from, to }
    });
  }

  // Obter composição da encomenda
  getOrderComposition(orderId: number): Observable<any> {
    return this.http.get(`${this.compositionUrl}/details/${orderId}`);
  }

  // Atribuir envio (shipping) à encomenda
  assignShippingToOrder(orderId: number, shippingId: number): Observable<any> {
    return this.http.put(`${this.ordersUrl}/${orderId}/shipping/${shippingId}`, {});
  }

  // Cancelar encomenda
  cancelOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.ordersUrl}/${orderId}/cancel`, {});
  }

  // Finalizar encomenda
  completeOrder(orderId: number): Observable<any> {
    return this.http.put(`${this.ordersUrl}/${orderId}/complete`, {});
  }
}
