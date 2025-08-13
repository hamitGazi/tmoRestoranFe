import {Component, OnInit, signal} from '@angular/core';
import {MasaOption, PersonelOption, SiparisModel} from '../model/siparis/siparis.model';
import {EnumRecord, MasaModel} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SiparisService} from '../services/siparis/siparis.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ListSiparisForm} from '../model/siparis/siparis.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {InputText} from 'primeng/inputtext';
import {Tooltip} from 'primeng/tooltip';
import {Router} from '@angular/router';
import {MasaService} from '../services/masa/masa.service';
import {PersonelService} from '../services/personel/personel.service';

@Component({
  selector: 'app-siparis',
  templateUrl: './siparis.component.html',
  imports: [
    Toolbar,
    Button,
    TableModule,
    ReactiveFormsModule,
    Dialog,
    Select,
    Toast,
    ConfirmDialog,
    InputText,
    Tooltip
  ],
  styleUrl: './siparis.component.css'
})

export class SiparisComponent implements OnInit {
  siparisDatas = signal<SiparisModel[]>([]);
  selectedSiparisObject = signal<SiparisModel | null>(null);
  masaOptions = signal<MasaOption[]>([]);
  personelOptions = signal<PersonelOption[]>([]);
  siparisDurumOptions = signal<EnumRecord[]>([]);



  siparisUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

  selectedProduct!: MasaModel;

  metaKey: boolean = true;

  constructor(
    private siparisService: SiparisService,
    private masaService: MasaService,
    private personelService: PersonelService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
  ) {

    this.siparisUpdateForm = ListSiparisForm.siparisUpdateForm();
  }

  ngOnInit() {
    this.getAllSiparisler();
    this.getMasaOptions();
    this.getPersonelOptions();
    this.getSiparisDurumOptions();
  }

  getAllSiparisler() {
    this.siparisService.getAllSiparisler().subscribe({
      next: (res) => {
        this.siparisDatas.set(res.data);

      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Siparişler yüklenemedi.'
        });
      }
    });
  }

  getMasaOptions() {
    this.masaService.getAllMasalar().subscribe({
      next: (res) => {
        this.masaOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Masalar yüklenemedi.'
        });
      }
    });
  }

  getPersonelOptions() {
    this.personelService.getAllPersoneller().subscribe({
      next: (res) => {
        this.personelOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Personeller yüklenemedi.'
        });
      }
    });
  }

  getSiparisDurumOptions() {
    this.siparisService.getSiparisDurumEnum().subscribe({
      next: (res) => {
        this.siparisDurumOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Sipariş durumları yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllSiparisler();
    this.selectedSiparisObject.set(null);
  }

  goToSaveSiparisFrom():void{
    this.router.navigate(['/siparis/yeni'])

  }


  showUpdateForm() {
    this.siparisUpdateForm.reset({
      id: this.selectedSiparisObject()?.id
    });
    this.siparisService.getSiparisById(this.selectedSiparisObject()?.id).subscribe(res => {
      this.displayUpdateForm.set(true);
      this.siparisUpdateForm.patchValue({
        ...res.data,
        masa: res.data.masa.id,
        personel: res.data.personel.id,
      });

    })
  }

  closeUpdateForm() {
    this.siparisUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateSiparis() {
    this.siparisService.updateSiparis(this.siparisUpdateForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Sipariş güncellendi.'
        });
        this.refresh();
        this.closeUpdateForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Sipariş güncellenemedi.'
        });
      }
    });
  }


  deleteSiparisConfirm(event: any) {
    this.confirmationService.confirm({
      message: 'Bu siparişi silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteSiparis();
      },
      reject: () => {
        this.messageService.add({
          severity: 'warn',
          summary: 'İptal',
          detail: 'Silme işlemi iptal edildi.'
        });
      }
    });
  }

  deleteSiparis() {
    const id = this.selectedSiparisObject()?.id;

    this.siparisService.deleteSiparis(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Sipariş silindi.'
        });
        this.refresh();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Sipariş silinemedi.'
        });
      }
    });
  }

  goToSiparisKalemleri(id: number) {
    this.router.navigate(['/siparis-kalemi'], { queryParams: { siparisId: id } });
  }

}



