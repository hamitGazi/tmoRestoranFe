import {Component, OnInit, signal} from '@angular/core';
import {PersonelRaporModel} from '../model/raporlar/rapor.model';
import {EnumRecord, GenericBaseModel} from '../model/masa/masa.model';
import {FormGroup} from '@angular/forms';
import {PersonelRaporService} from '../services/rapor/personel-rapor.service';
import {RaporForm} from '../model/raporlar/rapor.form';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-personel-rapor',
  standalone: false,
  templateUrl: './personel-rapor-component.html',
  styleUrl: './personel-rapor-component.css'
})
export class PersonelRaporComponent implements OnInit {
  raporDatas = signal<PersonelRaporModel[]>([]);
  rolEnumList = signal<EnumRecord[]>([]);
  raporFilterForm!: FormGroup;
  chartData = signal<any>({});
  chartOptions = signal<any>({
    responsive: true,
    plugins: { legend: { position: 'top' } }
  });

  constructor(
    private personelRaporService: PersonelRaporService,
    private raporForm: RaporForm,
    private messageService: MessageService
  ) {
    this.raporFilterForm = RaporForm.personelRaporForm();
  }

  ngOnInit() {
    this.getRolEnum();
    this.filterRapor();
  }

  getRolEnum() {
    this.personelRaporService.getRolEnum().subscribe({
      next: (res: GenericBaseModel<EnumRecord[]>) => {
        this.rolEnumList.set(res.data);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Rol türleri yüklenemedi.'
        });
      }
    });
  }

  filterRapor() {
    if (!this.raporForm.validateFilterForm(this.raporFilterForm)) return;
    this.personelRaporService.getPersonelRaporlari(this.raporFilterForm.value).subscribe({
      next: (res: GenericBaseModel<PersonelRaporModel[]>) => {
        this.raporDatas.set(res.data);
        this.updateChart();
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Personel raporları yüklenemedi.'
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
      labels: this.raporDatas().map(r => r.personelAdi),
      datasets: [{
        label: 'Toplam Satış',
        data: this.raporDatas().map(r => r.toplamSatis),
        backgroundColor: '#42A5F5'
      }]
    });
  }

  exportCSV() {
    const table = document.querySelector('p-table') as any;
    table?.exportCSV();
  }
}
