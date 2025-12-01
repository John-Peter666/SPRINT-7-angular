import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-contato',
  imports: [FormsModule],
  templateUrl: './chat-contato.component.html',
  styleUrls: ['./chat-contato.component.css']
})
export class ChatContatoComponent {
  isOpen = false;
  contato = {
    email: '',
    celular: '',
    mensagem: ''
  };

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  enviarContato() {
    console.log('Contato enviado:', this.contato);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    
    // Reset form
    this.contato = {
      email: '',
      celular: '',
      mensagem: ''
    };
    
    this.isOpen = false;
  }
}