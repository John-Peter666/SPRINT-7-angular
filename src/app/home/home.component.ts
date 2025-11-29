import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Veiculos, VeiculosAPI } from '../models/veiculo.model';

interface VehicleDataResponse {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // -------------------------
  // Dashboard / Veículos
  // -------------------------
  availableVehicles: string[] = [];
  vehiclesList: Veiculos = [];
  dashboardData = {
    totalSales: 0,
    connectedVehicles: 0,
    updatedSoftware: 0
  };
  vehicleImageUrl = '';
  selectedVehicle = '';
  tableSearchQuery = '';
  vehicleData: any[] = [];

  // -------------------------
  // Carrossel
  // -------------------------
  slides = [
    'img/Captura-de-tela.png',
    'img/tela-2.png',
    'img/tela-3.png'
  ];
  currentSlide = 0;
  intervalId: any;

  // -------------------------
  // Usuário
  // -------------------------
  nomeUsuario: string = '';

  constructor(
    public router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.fetchVehicles();
    this.startAutoSlide();
    if (isPlatformBrowser(this.platformId)) {
      this.nomeUsuario = localStorage.getItem('nomeCompleto') || 'Usuário';
    }
  }

  // -------------------------
  // Dashboard Methods
  // -------------------------
  fetchVehicles() {
    const apiUrl = 'http://localhost:3001';
    this.http.get<VeiculosAPI>(`${apiUrl}/vehicles`)
      .subscribe({
        next: (res) => {
          this.vehiclesList = res.vehicles;
          this.availableVehicles = this.vehiclesList.map(v => v.vehicle);
          if (this.availableVehicles.length > 0) {
            this.fetchDataForDashboard(this.availableVehicles[0]);
          }
        },
        error: () => console.error('Erro ao carregar veículos')
      });
  }

  fetchDataForDashboard(vehicleName: string) {
    const vehicle = this.vehiclesList.find(v => v.vehicle === vehicleName);
    if (!vehicle) return;
    this.selectedVehicle = vehicle.vehicle;
    const original = (vehicle as any);
    this.vehicleImageUrl = original.img;
    this.dashboardData.totalSales = Number(vehicle.volumetotal);
    this.dashboardData.connectedVehicles = Number(vehicle.connected);
    this.dashboardData.updatedSoftware = Number(vehicle.softwareUpdates);
  }

  filterTableData() {
    const vin = this.tableSearchQuery.trim();
    if (vin.length === 0) {
      this.vehicleData = [];
      return;
    }
    const apiUrl = 'http://localhost:3001';
    this.http.post<VehicleDataResponse>(`${apiUrl}/vehicleData`, { vin })
      .subscribe({
        next: (data) => {
          this.vehicleData = [{
            code: vin,
            model: this.selectedVehicle,
            status: data.status,
            lastUpdate: 'Hoje',
            mileage: data.odometro
          }];
        },
        error: () => { this.vehicleData = []; }
      });
  }

  // -------------------------
  // Carrossel Methods
  // -------------------------
  startAutoSlide() {
    this.intervalId = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoSlide() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  // -------------------------
  // Logout
  // -------------------------
  logout() {
    this.router.navigate(['/login']);
  }
}
