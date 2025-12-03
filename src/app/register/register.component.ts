import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  aceitaLGPD: boolean = false;

  errorMessage: string = '';
  successMessage: string = '';

  showLGPD: boolean = false;

  constructor(private router: Router) {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    if (!this.aceitaLGPD) {
      this.errorMessage = 'Você precisa concordar com os termos da LGPD para se registrar!';
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('nomeCompleto', this.name);

    this.successMessage = 'Conta criada com sucesso! Redirecionando...';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  openLGPD(event: Event) {
    event.preventDefault();
    this.showLGPD = true;
  }

  closeLGPD() {
    this.showLGPD = false;
  }

  // 🔥 NOVO: dispara sempre que marcar/desmarcar a checkbox de LGPD
  onLGPDCheck() {
    console.log(" Checkbox LGPD clicado!");
    console.log("Nome:", this.name);
    console.log("Email:", this.email);
    console.log("Senha:", this.password);
    console.log("Confirmar senha:", this.confirmPassword);
    console.log("Aceitou LGPD:", this.aceitaLGPD);
  }
}
