import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShippingService } from '../../services/shipping.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { ShippingOrder } from '../../models/shipping.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  shipping: ShippingOrder = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: '',
    postalCode: ''
  };

  userId = 1; // substituir por auth futuramente

  constructor(
    private shippingService: ShippingService,
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  submitOrder() {
    this.shippingService.createShippingOrder(this.shipping).subscribe(shippingResp => {
      this.cartService.getCartItems(this.userId).subscribe(cartItems => {
        const bookIds = cartItems.map(item => item.bookId);
        const orderData = {
          userId: this.userId,
          shippingId: shippingResp.id!,
          bookIds
        };
        this.orderService.createOrder(orderData).subscribe(() => {
          this.cartService.clearCart().subscribe(() => {
            alert('Encomenda finalizada com sucesso!');
          });
        });
      });
    });
  }
}
