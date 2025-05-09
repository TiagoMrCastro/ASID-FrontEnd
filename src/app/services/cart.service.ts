import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/cart';

  constructor(private http: HttpClient) {}

  addToCart(item: { userId: number; bookId: number; quantity: number }): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/add`, item);
  }

  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/user/${userId}`);
  }

  removeItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  clearCart(): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/clearcart`);
  }
}
