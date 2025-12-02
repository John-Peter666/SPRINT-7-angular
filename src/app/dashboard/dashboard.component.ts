import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
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
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, RouterModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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

  private apiUrl = 'http://localhost:3001';

  constructor(public router: Router, private http: HttpClient) { }

  


  ngOnInit(): void {
    this.fetchVehicles();
    
  }

 fetchVehicles() {
  this.http.get<VeiculosAPI>(`${this.apiUrl}/vehicles`)
    .subscribe({
      next: (res) => {
        this.vehiclesList = res.vehicles;
        this.availableVehicles = this.vehiclesList.map(v => v.vehicle);
        
        //  ADICIONA ISSO PARA VER TODOS OS DADOS DOS VEÍCULOS
        console.log('=== DADOS COMPLETOS DOS VEÍCULOS ===');
        console.log('Lista completa:', this.vehiclesList);
        
        // Mostra cada veículo com seus dados
        this.vehiclesList.forEach((veiculo, index) => {
          console.log(`Veículo ${index + 1}:`, veiculo);
        });
        
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

    // Dados fictícios baseados nos VINs
    const vehicleDataMap: {[key: string]: any} = {
        'RANGER2024001': {
            code: 'RANGER2024001',
            model: 'Ranger',
            status: 'Conectado',
            lastUpdate: 'Hoje',
            mileage: 15000
        },
        'MUSTANG2024001': {
            code: 'MUSTANG2024001', 
            model: 'Mustang',
            status: 'Em Manutenção',
            lastUpdate: 'Ontem',
            mileage: 8000
        },
        'TERRITORY2024001': {
            code: 'TERRITORY2024001',
            model: 'Territory', 
            status: 'Conectado',
            lastUpdate: 'Hoje',
            mileage: 12000
        },
        'BRONCO2024001': {
            code: 'BRONCO2024001',
            model: 'Bronco Sport',
            status: 'Desconectado',
            lastUpdate: '2 dias atrás',
            mileage: 9500
        }
    };

    if (vehicleDataMap[vin]) {
        this.vehicleData = [vehicleDataMap[vin]];
        
        //  AQUI MUDA O VEÍCULO SELECIONADO NO DROPDOWN
        this.selectedVehicle = vehicleDataMap[vin].model;
        this.fetchDataForDashboard(this.selectedVehicle);
    } else {
        this.vehicleData = [];
    }
}

  logout() {
    this.router.navigate(['/login']);
  }


}
