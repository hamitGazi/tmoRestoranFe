import {Component, OnInit, signal} from '@angular/core';
import {MusteriOption, RezervasyonModel} from '../model/rezervasyon/rezervasyon.model';
import {MasaOption} from '../model/siparis/siparis.model';
import {EnumRecord, MasaModel} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RezervasyonService} from '../services/rezervasyon/rezervasyon.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RezervasyonForm} from '../model/rezervasyon/rezervasyon.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'app-rezervasyon',


  templateUrl: './rezervasyon.component.html',
  imports: [
    Toolbar,
    Button,
    TableModule,
    ReactiveFormsModule,
    Dialog,
    Select,
    Toast,
    ConfirmDialog,
    DatePicker
  ],
  styleUrl: './rezervasyon.component.css'
})
export class RezervasyonComponent implements OnInit {
  rezervasyonDatas = signal<RezervasyonModel[]>([]);
  selectedRezervasyonObject = signal<RezervasyonModel | null>(null);
  musteriOptions = signal<MusteriOption[]>([]);
  masaOptions = signal<MasaOption[]>([]);
  durumOptions = signal<EnumRecord[]>([]);

  rezervasyonSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  rezervasyonUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);
  selectedProduct!: MasaModel;

  metaKey: boolean = true;

  constructor(
    private rezervasyonService: RezervasyonService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.rezervasyonSaveForm = RezervasyonForm.rezervasyonSaveForm();
    this.rezervasyonUpdateForm = RezervasyonForm.rezervasyonUpdateForm();
  }

  ngOnInit() {
    this.getAllRezervasyonlar();
    this.getMusteriOptions();
    this.getMasaOptions();
    this.getDurumOptions();
  }

  getAllRezervasyonlar() {
    this.rezervasyonService.getAllRezervasyonlar().subscribe({
      next: (res) => {
        this.rezervasyonDatas.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Rezervasyonlar yüklenemedi.'
        });
      }
    });
  }

  getMusteriOptions() {
    this.rezervasyonService.getAllMusteriler().subscribe({
      next: (res) => {
        this.musteriOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Müşteriler yüklenemedi.'
        });
      }
    });
  }

  getMasaOptions() {
    this.rezervasyonService.getAllMasalar().subscribe({
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

  getDurumOptions() {
    this.rezervasyonService.getDurumEnum().subscribe({
      next: (res) => {
        this.durumOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Durumlar yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllRezervasyonlar();
    this.selectedRezervasyonObject.set(null);
  }

  showSaveForm() {
    this.rezervasyonSaveForm.reset({
      durum: 'BEKLEMEDE', rezervasyonZamani: new Date()
    });
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.rezervasyonSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveRezervasyon() {

    this.rezervasyonService.saveRezervasyon(this.rezervasyonSaveForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Rezervasyon kaydedildi.'
        });
        this.refresh();
        this.closeSaveForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Rezervasyon kaydedilemedi.'
        });
      }
    });
  }


  showUpdateForm() {
    this.rezervasyonUpdateForm.reset({
      id: this.selectedRezervasyonObject()?.id
    });
    this.rezervasyonService.getRezervasyonById(this.selectedRezervasyonObject()?.id).subscribe(res => {
      this.displayUpdateForm.set(true);
      const baslangic = new Date(res.data.rezervasyonZamani);

      this.rezervasyonUpdateForm.patchValue({
        ...res.data,
        rezervasyonZamani: baslangic,

      });

    })
  }

  closeUpdateForm() {
    this.rezervasyonUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateRezervasyon() {

    this.rezervasyonService.updateRezervasyon(this.rezervasyonUpdateForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Rezervasyon güncellendi.'
        });
        this.refresh();
        this.closeUpdateForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Rezervasyon güncellenemedi.'
        });
      }
    });
  }


  deleteRezervasyonConfirm(event: any) {

    this.confirmationService.confirm({
      message: 'Bu rezervasyonu silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteRezervasyon();
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

  deleteRezervasyon() {
    const id = this.selectedRezervasyonObject()?.id;

    this.rezervasyonService.deleteRezervasyon(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Rezervasyon silindi.'
        });
        this.refresh();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Rezervasyon silinemedi.'
        });
      }
    });
  }
}

