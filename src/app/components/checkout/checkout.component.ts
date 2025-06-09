import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShippingService } from '../../services/shipping.service';
import { OrderService } from '../../services/order.service';
import { ShippingOrder } from '../../models/shipping.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Book, BookService } from '../../services/book.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    NavbarComponent,
    HttpClientModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  orderId!: number;
  composition: any;
  shippingOptions: ShippingOrder[] = [];
  selectedShippingId: number | null = null;
  books: Book[] = [];

  constructor(
    private orderService: OrderService,
    private shippingService: ShippingService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedId = localStorage.getItem('checkout_order_id');
    if (!savedId) {
      alert('Nenhuma encomenda encontrada. Por favor, crie uma primeiro.');
      return;
    }
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    });
    this.orderId = Number(savedId);
    this.loadComposition();
    this.loadShippingOptions();
  }

  loadComposition() {
    this.orderService.getOrderComposition(this.orderId).subscribe((data) => {
      this.composition = data;
    });
  }

  loadShippingOptions() {
    this.shippingService.getAllShippingOrders().subscribe((data) => {
      this.shippingOptions = data;
    });
  }

  assignShipping() {
    if (!this.selectedShippingId) {
      alert('Selecione um endereço de envio.');
      return;
    }

    this.orderService
      .assignShippingToOrder(this.orderId, this.selectedShippingId)
      .subscribe(() => {
        alert('Endereço de envio atribuído com sucesso!');
        this.loadComposition(); // Recarrega os dados
      });
  }

  finalizeOrder() {
    if (!this.orderId) return;

    this.orderService.completeOrder(this.orderId).subscribe(() => {
      this.cartService.clearCart().subscribe(() => {
        alert('✅ Encomenda finalizada com sucesso!');
      });
        setTimeout(() => {
          this.loadComposition(); // Executa após 1 segundo
        }, 1000);
    });
  }

  cancelOrder() {
    if (!this.orderId) return;
    const confirmed = window.confirm(
      'Tem certeza que deseja cancelar a encomenda?'
    );
    if (!confirmed) return;
    this.orderService.cancelOrder(this.orderId).subscribe(() => {
      this.cartService.clearCart().subscribe(() => {
        alert('❌ Encomenda cancelada.');
        localStorage.removeItem('checkout_order_id');
        this.router.navigate(['/books']); // se preferir com Angular Router
      });
    });
  }

  getImageFilename(BookId: string): string {
    if (!BookId) return 'placeholder.png';
    return BookId + '.jpg';
  }
}
