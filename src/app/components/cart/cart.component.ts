import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service'; 
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule,  MatToolbarModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId: number | null = null;

  constructor(private cartService: CartService, private auth: AuthService, private router: Router) {} 

  ngOnInit() {
    this.userId = this.auth.getUserId();

    if (this.userId === null) {
      alert('Utilizador não autenticado!');
      return;
    }

    this.loadCart();
  }

  loadCart() {
    if (this.userId === null) return;

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

  
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
