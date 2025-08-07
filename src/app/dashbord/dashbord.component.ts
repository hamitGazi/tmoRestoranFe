import {Component, OnInit, signal} from '@angular/core';
import {UIChart} from 'primeng/chart';
import {DashboardService} from '../services/dashbord/dashbord.service';
import {MessageService} from 'primeng/api';
import {Card} from 'primeng/card';
import {Toast} from 'primeng/toast';
import {CommonModule} from '@angular/common';
import {DashboardOzetModel} from '../model/dashbord/dashbord.model';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  imports: [
    CommonModule,
    UIChart,
    Card,
    Toast,
  ],
  styleUrl: './dashbord.component.css'
})/*

export class DashboardComponent implements OnInit {
  stats = signal<DashboardStat[]>([]);
  stats$ = toObservable(this.stats); // observable version for async pipe
  odemeChartData = signal<PieChartData | null>(null);
  siparisChartData = signal<PieChartData | null>(null);

  constructor() {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.stats.set([
      { label: 'Toplam Masa', value: 25, icon: 'pi pi-table', color: '#4087be' },
      { label: 'Aktif Sipariş', value: 12, icon: 'pi pi-shopping-cart', color: '#ff9800' },
      { label: 'Toplam Personel', value: 8, icon: 'pi pi-users', color: '#28a745' },
      { label: 'Stok Kalemi', value: 44, icon: 'pi pi-box', color: '#9C27B0' }
    ]);

    this.odemeChartData.set({
      labels: ['Nakit', 'Kredi Kartı', 'Online'],
      datasets: [
        {
          data: [50, 30, 20],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    });

    this.siparisChartData.set({
      labels: ['Bekliyor', 'Hazırlanıyor', 'Servis Edildi', 'Tamamlandı'],
      datasets: [
        {
          data: [5, 8, 4, 10],
          backgroundColor: ['#FF9800', '#2196F3', '#4CAF50', '#9C27B0']
        }
      ]
    });
  }
}
*/

export class DashboardComponent implements OnInit {
  ozetData = signal<DashboardOzetModel | null>(null);
  siparisDurumChartData = signal<any>(null);

  constructor(
    private dashboardService: DashboardService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.getOzet();
    this.getSiparisDurumGrafik();
  }

  getOzet() {
    this.dashboardService.getOzet().subscribe({
      next: (res) => {
        this.ozetData.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Özet veriler yüklenemedi.'
        });
      }
    });
  }

  getSiparisDurumGrafik() {
    this.dashboardService.getSiparisDurumGrafik().subscribe({
      next: (res) => {
        const labels = res.data.map(item => item.durum);
        const data = res.data.map(item => item.adet);
        this.siparisDurumChartData.set({
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: ['#28a745', '#ff9800', '#4087be', '#dc3545'],
            hoverBackgroundColor: ['#218838', '#f57c00', '#326a9e', '#c82333']
          }]
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Sipariş durum grafiği yüklenemedi.'
        });
      }
    });
  }
}
