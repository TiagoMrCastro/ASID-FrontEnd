import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartService } from '../../services/cart.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    HttpClientModule 
  ],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: any[] = [];
  constructor(private bookService: BookService, private cartService: CartService) {}
    imageList: string[] = [];
  ngOnInit(): void {
    this.loadBooks();
    console.log(this.books)
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  // getImageFilename(title: string): string {
  //   return title.toLowerCase().replace(/\s+/g, '-') + '.jpg';
  // }

  

  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books = this.books.filter(book => book.id !== id);
    });
  }
  
  addToCart(bookId: number) {
    const userId = 1; // futuro: usar auth
    this.cartService.addToCart({ userId, bookId, quantity: 1 }).subscribe(() => {
      alert('Livro adicionado ao carrinho!');
    });
  }

}
