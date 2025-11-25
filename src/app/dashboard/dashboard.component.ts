import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Veiculos, VeiculosAPI } from '../models/veiculo.model';
import { RouterModule, Router } from '@angular/router';
import { NgFor } from '@angular/common';


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
  imports: [FormsModule, NgFor, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public router: Router, private http: HttpClient) { }

  private apiUrl = 'http://localhost:3001';

  
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

  ngOnInit(): void {
    this.fetchVehicles();
  }

  
  fetchVehicles() {
    this.http.get<VeiculosAPI>(`${this.apiUrl}/vehicles`)
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

    this.http.post<VehicleDataResponse>(`${this.apiUrl}/vehicleData`, { vin })
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
        error: () => {
          this.vehicleData = [];
        }
      });
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
