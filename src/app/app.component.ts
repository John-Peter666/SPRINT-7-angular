import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatContatoComponent } from './components/chat-contato/chat-contato.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatContatoComponent], // 👈 ÚNICO
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjetoAngular';
}