import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { OrderDetailsResponse } from '../../../models/order-history.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../services/auth.service';
import { BookService, Book } from '../../../services/book.service';
import { ShippingService } from '../../../services/shipping.service';
import { ShippingOrder } from '../../../models/shipping.model';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    NavbarComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders: OrderDetailsResponse[] = [];
  books: Book[] = [];
  shippings: ShippingOrder[] = [];
  from: Date | null = null;
  to: Date | null = null;

  userId: number | null = null;

  constructor(
    private orderService: OrderService,
    private auth: AuthService,
    private bookService: BookService,
    private shippingService: ShippingService
  ) {
    this.userId = this.auth.getUserId();
  }

  ngOnInit() {
    this.bookService.getBooks().subscribe((books) => {
      this.books = books;
    });
    this.shippingService.getAllShippingOrders().subscribe((shippings) => {
      this.shippings = shippings;
    });
  }

  fetchOrders() {
    if (!this.from || !this.to) {
      alert('Seleciona datas válidas');
      return;
    }

    if (this.userId === null) {
      alert('Utilizador não autenticado!');
      return;
    }

    this.orderService
      .getOrderHistory(
        this.userId,
        this.formatDate(this.from),
        this.formatDate(this.to)
      )
      .subscribe((res) => {
        this.orders = res;
      });
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find((b) => b.id === bookId);
    return book ? book.title : `Livro #${bookId} (não encontrado)`;
  }

  getShippingName(shippingId: string): string {
    const shipping = this.shippings.find(
      (s) => s.id?.toString() === shippingId
    );
    return shipping
      ? `${shipping.firstName} ${shipping.lastName}`
      : 'Não disponível';
  }

  getShippingAdress(shippingId: string): string {
    const shipping = this.shippings.find(
      (s) => s.id?.toString() === shippingId
    );
    return shipping ? `${shipping.address}` : 'Não disponível';
  }

  formatDate(date: Date | null): string {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() é 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
