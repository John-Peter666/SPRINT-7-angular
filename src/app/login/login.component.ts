import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  autoLogin = false;
  showPassword = false;
  errorMessage: string | null = null;

  private readonly API_LOGIN_URL = 'http://localhost:3001/login';

  constructor(private router: Router, private http: HttpClient) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.errorMessage = null;

    const body = {
      nome: this.username,
      senha: this.password
    };

    this.http.post(this.API_LOGIN_URL, body)
      .pipe(
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            this.errorMessage = 'Usuário ou senha inválidos.';
          } else {
            this.errorMessage = 'Erro ao conectar ao servidor.';
          }
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          this.router.navigate(['/home']);
        }
      });
  }
}
