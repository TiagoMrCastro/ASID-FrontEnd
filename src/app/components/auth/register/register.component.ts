import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  fullname = '';
  username = '';
  email = '';
  password = '';
  isLoading = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.fullname || !this.username || !this.email || !this.password) {
      alert('Preencha todos os campos.');
      return;
    }

    this.isLoading = true;
    this.auth
      .register({
        fullname: this.fullname,
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          alert('Registo efetuado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading = false;

          let mensagem = 'Erro ao registar.';

          if (err.error && typeof err.error === 'object') {
            mensagem =
              err.error.message || err.error.error || JSON.stringify(err.error);
          } else if (typeof err.error === 'string') {
            mensagem = err.error;
          }

          alert('Erro ao registar: ' + mensagem);
        },
      });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
