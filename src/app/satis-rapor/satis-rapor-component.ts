import {Component, OnInit, signal} from '@angular/core';

import {EnumRecord, GenericBaseModel} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {SatisRaporService} from '../services/rapor/satisRapor.service';
import {RaporForm} from '../model/raporlar/rapor.form';
import {RaporFilterService} from '../services/rapor/rapor.service';
import {SatisRaporModel} from '../model/raporlar/rapor.model';
import {Button} from 'primeng/button';
import {UIChart} from 'primeng/chart';
import {Toast} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {Select} from 'primeng/select';
import {Toolbar} from 'primeng/toolbar';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-satis-rapor',
  templateUrl: './satis-rapor-component.html',
  imports: [
    Button,
    UIChart,
    Toast,
    TableModule,
    Select,
    ReactiveFormsModule,
    Toolbar,
    DatePicker
  ],
  styleUrl: './satis-rapor-component.css'
})
export class SatisRaporComponent implements OnInit {
  raporDatas = signal<SatisRaporModel[]>([]);
  odemeTurEnumList = signal<EnumRecord[]>([]);
  raporFilterForm!: FormGroup;
  chartData = signal<any>({});
  chartOptions = signal<any>({
    responsive: true,
    plugins: { legend: { position: 'top' } }
  });

  constructor(
    private satisRaporService: SatisRaporService,
    private raporForm: RaporForm,
    private messageService: MessageService
  ) {
    this.raporFilterForm = RaporForm.satisRaporForm();
  }

  ngOnInit() {
    this.getOdemeYonEnum();
    this.filterRapor();
  }

  getOdemeYonEnum() {
    this.satisRaporService.getOdemeYonEnum().subscribe({
      next: (res: GenericBaseModel<EnumRecord[]>) => {
        this.odemeTurEnumList.set(res.data);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödeme türleri yüklenemedi.'
        });
      }
    });
  }

  filterRapor() {
    if (!this.raporForm.validateFilterForm(this.raporFilterForm)) return;
    this.satisRaporService.getSatisRaporlari(this.raporFilterForm.value).subscribe({
      next: (res: GenericBaseModel<SatisRaporModel[]>) => {
        this.raporDatas.set(res.data);
        this.updateChart();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Satış raporları yüklenemedi.'
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
        label: 'Toplam Tutar',
        data: this.raporDatas().map(r => r.toplamTutar),
        backgroundColor: '#42A5F5'
      }]
    });
  }

  exportCSV() {
    const table = document.querySelector('p-table') as any;
    table?.exportCSV();
  }
}
