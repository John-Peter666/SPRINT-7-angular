import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface Carro {
  nome: string;
  preco: number;
  imagem: string;
  selected: boolean;
  alturaCacamba?: number;
  alturaVeiculo?: number;
  alturaSolo?: number;
  capacidadeCarga?: number;
  motor?: string;
  potencia?: number;
  volumeCacamba?: number;
  roda?: string;
}

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent {
  // Use a mesma chave que você salvou em Register/Home (ex: 'nomeCompleto')
  nomeUsuario = (typeof window !== 'undefined' && localStorage.getItem('nomeCompleto')) || 'Usuário';

  carros: Carro[] = [
    {
      nome: 'XL Cabine',
      preco: 280000,
      imagem: 'img/XL Cabine.jpg', // ajuste conforme sua pasta de assets
      selected: false,
      alturaCacamba: 540,
      alturaVeiculo: 1850,
      alturaSolo: 235,
      capacidadeCarga: 1000,
      motor: '3.2 Diesel',
      potencia: 200,
      volumeCacamba: 1180,
      roda: 'Aro 18'
    },
    {
      nome: 'xls 2.2 diesel',
      preco: 220000,
      imagem: 'img/xls 2.2 diesel.jpg', // ajuste conforme sua pasta de assets
      selected: false,
      alturaCacamba: 510,
      alturaVeiculo: 1830,
      alturaSolo: 220,
      capacidadeCarga: 850,
      motor: '2.0 EcoBoost',
      potencia: 253,
      volumeCacamba: 1000,
      roda: 'Aro 17'
    },
    {
      nome: 'Storm',
      preco: 350000,
      imagem: 'img/storm.jpg',
      selected: false,
      alturaCacamba: 600,
      alturaVeiculo: 1380,
      alturaSolo: 125,
      capacidadeCarga: 400,
      motor: '5.0 V8',
      potencia: 450,
      volumeCacamba: 400,
      roda: 'Aro 19'
    }
  ];

  carrosSelecionados: Carro[] = [];
  mostrarComparacao = false;

  constructor(private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

toggleCarSelection(carro: Carro) {
  carro.selected = !carro.selected;
  this.carrosSelecionados = this.carros.filter(c => c.selected);

  if (this.carrosSelecionados.length > 2) {
    // desalimenta a última seleção
    carro.selected = false;
    this.carrosSelecionados = this.carros.filter(c => c.selected);
    alert('Selecione no máximo 2 carros para comparar.');
  }
}
  comparar() {
    if (this.carrosSelecionados.length !== 2) {
      alert('Selecione exatamente 2 carros para comparar.');
      return;
    }
    this.mostrarComparacao = true;
  }

  fecharComparacao() {
    this.mostrarComparacao = false;
  }
}
