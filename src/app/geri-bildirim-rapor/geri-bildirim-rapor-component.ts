import {Component, OnInit, signal} from '@angular/core';
import {EnumRecord, GenericBaseModel} from '../model/masa/masa.model';
import {GeriBildirimRaporModel} from '../model/raporlar/rapor.model';
import {FormGroup} from '@angular/forms';
import {GeriBildirimRaporService} from '../services/rapor/geri-bildirim-rapor.service';
import {RaporForm} from '../model/raporlar/rapor.form';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-geri-bildirim-rapor',
  standalone: false,
  templateUrl: './geri-bildirim-rapor-component.html',
  styleUrl: './geri-bildirim-rapor-component.css'
})
export class GeriBildirimRaporComponent implements OnInit {
  raporDatas = signal<GeriBildirimRaporModel[]>([]);
  geriBildirimTurEnumList = signal<EnumRecord[]>([]);
  raporFilterForm!: FormGroup;
  chartData = signal<any>({});
  chartOptions = signal<any>({
    responsive: true,
    plugins: { legend: { position: 'top' } }
  });

  constructor(
    private geriBildirimRaporService: GeriBildirimRaporService,
    private raporForm: RaporForm,
    private messageService: MessageService
  ) {
    this.raporFilterForm = RaporForm.geriBildirimRaporForm();
  }

  ngOnInit() {
    this.getGeriBildirimTurEnum();
    this.filterRapor();
  }

  getGeriBildirimTurEnum() {
    this.geriBildirimRaporService.getGeriBildirimTurEnum().subscribe({
      next: (res: GenericBaseModel<EnumRecord[]>) => {
        this.geriBildirimTurEnumList.set(res.data);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Geri bildirim türleri yüklenemedi.'
        });
      }
    });
  }

  filterRapor() {
    if (!this.raporForm.validateFilterForm(this.raporFilterForm)) return;
    this.geriBildirimRaporService.getGeriBildirimRaporlari(this.raporFilterForm.value).subscribe({
      next: (res: GenericBaseModel<GeriBildirimRaporModel[]>) => {
        this.raporDatas.set(res.data);
        this.updateChart();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Geri bildirim raporları yüklenemedi.'
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
        label: 'Puan',
        data: this.raporDatas().map(r => r.puan),
        backgroundColor: '#42A5F5'
      }]
    });
  }

  exportCSV() {
    const table = document.querySelector('p-table') as any;
    table?.exportCSV();
  }
}
