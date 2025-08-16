import {Component, OnInit, signal} from '@angular/core';
import {EnumRecord, GenericBaseModel} from '../model/masa/masa.model';
import {StokRaporModel} from '../model/raporlar/rapor.model';
import {FormGroup} from '@angular/forms';
import {RaporFilterService} from '../services/rapor/rapor.service';
import {MessageService} from 'primeng/api';
import {RaporForm} from '../model/raporlar/rapor.form';
import {StokRaporService} from '../services/rapor/stok-rapor.service';

@Component({
  selector: 'app-stok-rapor',
  standalone: false,
  templateUrl: './stok-rapor-component.html',
  styleUrl: './stok-rapor-component.css'
})
export class StokRaporComponent implements OnInit {
  raporDatas = signal<StokRaporModel[]>([]);
  islemTipEnumList = signal<EnumRecord[]>([]);
  raporFilterForm!: FormGroup;
  chartData = signal<any>({});
  chartOptions = signal<any>({
    responsive: true,
    plugins: { legend: { position: 'top' } }
  });


  constructor(
    private stokRaporService: StokRaporService,
    private raporForm: RaporForm,
    private messageService: MessageService
  ) {
    this.raporFilterForm = RaporForm.stokRaporForm();
  }
  ngOnInit() {
    this.getIslemTipEnum();
    this.filterRapor();
  }

  getIslemTipEnum() {
    this.stokRaporService.getIslemTipEnum().subscribe({
      next: (res: GenericBaseModel<EnumRecord[]>) => {
        this.islemTipEnumList.set(res.data);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'İşlem tipleri yüklenemedi.'
        });
      }
    });
  }

  filterRapor() {
    if (!this.raporForm.validateFilterForm(this.raporFilterForm)) return;
    this.stokRaporService.getStokRaporlari(this.raporFilterForm.value).subscribe({
      next: (res: GenericBaseModel<StokRaporModel[]>) => {
        this.raporDatas.set(res.data);
        this.updateChart();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Stok raporları yüklenemedi.'
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
      labels: this.raporDatas().map(r => new Date(r.islemTarihi).toLocaleDateString()),
      datasets: [{
        label: 'Stok Miktarı',
        data: this.raporDatas().map(r => r.miktar),
        borderColor: '#42A5F5',
        fill: false
      }]
    });
  }

  exportCSV() {
    const table = document.querySelector('p-table') as any;
    table?.exportCSV();
  }
}
