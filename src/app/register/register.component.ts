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

  // PROPRIEDADES LIGADAS AO HTML
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  aceitaLGPD: boolean = false; //  ADICIONADO

  errorMessage: string = '';
  successMessage: string = '';

  // PROPRIEDADES PARA MODAL LGPD
  showLGPD: boolean = false;

  constructor(private router: Router) {}

  // chamada direta do botão (garante execução mesmo se ngSubmit tiver algum problema)
  register() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validação dos campos obrigatórios
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Preencha todos os campos.';
      return;
    }

    // Validação da senha
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'As senhas não coincidem.';
      return;
    }

    //  VALIDAÇÃO DA LGPD (NOVO)
    if (!this.aceitaLGPD) {
      this.errorMessage = 'Você precisa concordar com os termos da LGPD para se registrar!';
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    // salva no localStorage (persistente no navegador)
    localStorage.setItem('user', JSON.stringify(newUser));
    // salva o nome separado para a Home
    localStorage.setItem('nomeCompleto', this.name);

    this.successMessage = 'Conta criada com sucesso! Redirecionando...';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1200);
  }

  // função explícita para voltar ao login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // ABRE O MODAL LGPD
  openLGPD(event: Event) {
    event.preventDefault(); // evita scroll para o topo
    this.showLGPD = true;
  }

  // FECHA O MODAL LGPD
  closeLGPD() {
    this.showLGPD = false;
  }
}