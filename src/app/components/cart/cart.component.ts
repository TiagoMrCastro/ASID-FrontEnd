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
import { BookService } from '../../services/book.service';
import { OrderService } from '../../services/order.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule,  MatToolbarModule, RouterModule,NavbarComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId: number | null = null;
  books: any[] = [];
  constructor(private cartService: CartService, private auth: AuthService, private router: Router, private bookService: BookService,  private orderService: OrderService ) {} 

  ngOnInit() {
    this.userId = this.auth.getUserId();

    if (this.userId === null) {
      alert('Utilizador não autenticado!');
      return;
    }

    this.loadCart();
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data.map(book => ({
        ...book,
        selectedQuantity: 1
      }));
    });
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

  bookExists(bookId: number): boolean {
    return this.books.some(b => b.id === bookId);
  }


  onCreateOrder() {
    if (!this.userId) return;

    const orderPayload = {
      userId: this.userId,
      items: this.cartItems.map(item => ({
        bookId: item.bookId,
        quantity: item.quantity,
        price: item.unitPrice
      })),
      shipping: {}
    };

    this.orderService.createOrderSaga(orderPayload).subscribe({
    next: (response) => {
      const orderId = response.body;
      if (orderId) {
        localStorage.setItem('checkout_order_id', orderId.toString());
        this.router.navigate(['/checkout']);
      } else {
        alert("Erro ao obter o número da encomenda.");
      }
    },
    error: err => {
      alert('Erro ao criar encomenda.');
      console.error(err);
    }
  });
  }
  
  getImageFilename(BookId: string): string {
  if (!BookId) return 'placeholder.png';
  return BookId
    + '.jpg';
  }

  getBookImage(bookId: number): string {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      return book.imageUrl || 'assets/images/' + this.getImageFilename(bookId.toString());
    }
    return 'assets/images/placeholder.png';
  }
  
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Livro+Sem+Capa';
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find(b => b.id === bookId);
    return book ? book.title : `Livro #${bookId}`;
  }

}
