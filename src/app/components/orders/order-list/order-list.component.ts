import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/order.service';
import { OrderDetailsResponse } from '../../../models/order-history.model';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

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
    MatDividerModule
  ],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  orders: OrderDetailsResponse[] = [];
  userId = 1;
  from = '';
  to = '';

  constructor(private orderService: OrderService) {}

  fetchOrders() {
    if (!this.from || !this.to) return alert('Seleciona datas válidas');
    this.orderService.getOrderHistory(this.userId, this.from, this.to).subscribe(res => {
      this.orders = res;
    });
  }
}
