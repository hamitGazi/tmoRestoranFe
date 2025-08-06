import {Component, OnInit, signal} from '@angular/core';
import {SatisRaporModel} from '../model/rapor/rapor.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {EnumRecord} from '../model/masa/masa.model';
import {RaporService} from '../services/rapor/rapor.service';
import {MessageService} from 'primeng/api';
import {RaporForm} from '../model/rapor/rapor.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {Select} from 'primeng/select';
import {TableModule} from 'primeng/table';
import {UIChart} from 'primeng/chart';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-rapor',


  templateUrl: './rapor.component.html',
  imports: [
    Toolbar,
    Button,
    ReactiveFormsModule,
    Select,
    TableModule,
    UIChart,
    Toast
  ],
  styleUrl: './rapor.component.css'
})

export class RaporComponent implements OnInit {
  raporDatas = signal<SatisRaporModel[]>([]);
  odemeTurOptions = signal<EnumRecord[]>([]);
  raporFilterForm!: FormGroup;

  denemeData = signal<any>(null);

  constructor(
    private raporService: RaporService,
    private messageService: MessageService
  ) {
    this.raporFilterForm = RaporForm.raporFilterForm();
  }

  ngOnInit() {
    this.getSatisRaporlari();
    this.getOdemeTurOptions();
  }

  getSatisRaporlari() {
    const { tarihBaslangic, tarihBitis, odemeTuru } = this.raporFilterForm.value;
    this.raporService.getSatisRaporlari(tarihBaslangic, tarihBitis, odemeTuru).subscribe({
      next: (res) => {
        this.raporDatas.set(res.data);
        this.updateChartData();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Raporlar yüklenemedi.'
        });
      }
    });
  }

  getOdemeTurOptions() {
    this.raporService.getOdemeTurEnum().subscribe({
      next: (res) => {
        this.odemeTurOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödeme türleri yüklenemedi.'
        });
      }
    });
  }

  filterRapor() {
    this.getSatisRaporlari();
  }

  resetFilter() {
    this.raporFilterForm.reset();
    this.getSatisRaporlari();
  }
  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Toplam Tutar (₺)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Tarih'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  updateChartData() {
    const raporlar = this.raporDatas();
    const labels = raporlar.map(rapor => rapor.tarih);
    const toplamTutarlar = raporlar.map(rapor => rapor.toplamTutar);

    this.denemeData.set({
      labels: labels,
      datasets: [
        {
          label: 'Toplam Tutar',
          data: toplamTutarlar,
          backgroundColor: '#4087be',
          borderColor: '#4087be',
          borderWidth: 1
        }
      ]
    });
  }
}
