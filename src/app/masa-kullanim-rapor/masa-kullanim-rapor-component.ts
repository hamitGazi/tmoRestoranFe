import {Component, OnInit, signal} from '@angular/core';
import {MasaKullanimRaporModel} from '../model/raporlar/rapor.model';
import {EnumRecord, GenericBaseModel} from '../model/masa/masa.model';
import {FormGroup} from '@angular/forms';
import {MasaKullanimRaporService} from '../services/rapor/masa-kullanim-rapor.service';
import {RaporForm} from '../model/raporlar/rapor.form';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-masa-kullanim-rapor',
  standalone: false,
  templateUrl: './masa-kullanim-rapor-component.html',
  styleUrl: './masa-kullanim-rapor-component.css'
})
export class MasaKullanimRaporComponent implements OnInit {
  raporDatas = signal<MasaKullanimRaporModel[]>([]);
  masaKonumEnumList = signal<EnumRecord[]>([]);
  raporFilterForm!: FormGroup;
  chartData = signal<any>({});
  chartOptions = signal<any>({
    responsive: true,
    plugins: { legend: { position: 'top' } }
  });

  constructor(
    private masaKullanimRaporService: MasaKullanimRaporService,
    private raporForm: RaporForm,
    private messageService: MessageService
  ) {
    this.raporFilterForm = RaporForm.masaKullanimRaporForm();
  }

  ngOnInit() {
    this.getMasaKonumEnum();
    this.filterRapor();
  }

  getMasaKonumEnum() {
    this.masaKullanimRaporService.getMasaKonumEnum().subscribe({
      next: (res: GenericBaseModel<EnumRecord[]>) => {
        this.masaKonumEnumList.set(res.data);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Masa konumları yüklenemedi.'
        });
      }
    });
  }

  filterRapor() {
    if (!this.raporForm.validateFilterForm(this.raporFilterForm)) return;
    this.masaKullanimRaporService.getMasaKullanimRaporlari(this.raporFilterForm.value).subscribe({
      next: (res: GenericBaseModel<MasaKullanimRaporModel[]>) => {
        this.raporDatas.set(res.data);
        this.updateChart();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Masa kullanım raporları yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.raporForm.resetFilterForm(this.raporFilterForm);
    this.filterRapor();
  }

  updateChart() {
    this.chartData.set({
      labels: this.raporDatas().map(r => new Date(r.tarih).toLocaleDateString()),
      datasets: [{
        label: 'Kullanılan Süre (Dakika)',
        data: this.raporDatas().map(r => r.kullanilanSure),
        backgroundColor: '#42A5F5'
      }]
    });
  }

  exportCSV() {
    const table = document.querySelector('p-table') as any;
    table?.exportCSV();
  }
}
