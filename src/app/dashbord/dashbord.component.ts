import {Component, OnInit, signal} from '@angular/core';
import {DashboardStat, PieChartData} from '../model/dashbord/dashbord.model';
import {Panel} from 'primeng/panel';
import {UIChart} from 'primeng/chart';
import {toObservable} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  imports: [
    Panel,
    UIChart,
  ],
  styleUrl: './dashbord.component.css'
})

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
