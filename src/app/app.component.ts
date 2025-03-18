// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
//
// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'ASID-Temp';
// }
import { Component } from '@angular/core';
import { BookListComponent } from './components/book-list/book-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BookListComponent],
  template: `<app-book-list></app-book-list>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { }
