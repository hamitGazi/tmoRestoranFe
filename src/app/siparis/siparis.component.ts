import {Component, OnInit, signal} from '@angular/core';
import {MasaOption, PersonelOption, SiparisModel} from '../model/siparis/siparis.model';
import {EnumRecord} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SiparisService} from '../services/siparis/siparis.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SiparisForm} from '../model/siparis/siparis.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

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
    ConfirmDialog
  ],
  styleUrl: './siparis.component.css'
})

export class SiparisComponent implements OnInit {
  siparisDatas = signal<SiparisModel[]>([]);
  selectedSiparisObject = signal<SiparisModel | null>(null);
  masaOptions = signal<MasaOption[]>([]);
  personelOptions = signal<PersonelOption[]>([]);
  siparisDurumOptions = signal<EnumRecord[]>([]);

  siparisSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  siparisUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

  constructor(
    private siparisService: SiparisService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.siparisSaveForm = SiparisForm.siparisSaveForm();
    this.siparisUpdateForm = SiparisForm.siparisUpdateForm();
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
    this.siparisService.getAllMasalar().subscribe({
      next: (res) => {
        this.masaOptions.set(res.data.map(masa => ({ id: masa.id, qrKodUrl: masa.qrKodUrl })));
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
    this.siparisService.getAllPersoneller().subscribe({
      next: (res) => {
        this.personelOptions.set(res.data.map(personel => ({ id: personel.id, ad: personel.ad })));
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

  showSaveForm() {
    this.siparisSaveForm.reset();
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.siparisSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveSiparis() {
    if (this.siparisSaveForm.valid) {
      this.siparisService.saveSiparis(this.siparisSaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Sipariş kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Sipariş kaydedilemedi.'
          });
        }
      });
    }
  }

  showUpdateForm() {
    if (this.selectedSiparisObject()) {
      this.siparisUpdateForm.patchValue(this.selectedSiparisObject()!);
      this.displayUpdateForm.set(true);
    }
  }

  closeUpdateForm() {
    this.siparisUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateSiparis() {
    if (this.siparisUpdateForm.valid) {
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
  }

  deleteSiparisConfirm(event: any) {
    if (!this.selectedSiparisObject()) return;
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
    if (id) {
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
  }
}
