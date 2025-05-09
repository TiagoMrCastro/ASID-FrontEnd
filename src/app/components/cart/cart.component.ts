import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId = 1; // substituir com auth real depois

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems(this.userId).subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(id: number) {
    this.cartService.removeItem(id).subscribe(() => this.loadCart());
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + (item.subTotal ?? 0), 0);
  }
}
