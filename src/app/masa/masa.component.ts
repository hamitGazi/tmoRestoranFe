import {Component, OnInit, signal} from '@angular/core';
import {EnumRecord, MasaModel} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MasaService} from '../services/masa/masa.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MasaForm} from '../model/masa/masa.form';
import {Button, ButtonDirective} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-masa',
  templateUrl: './masa.component.html',
  imports: [
    Button,
    Toolbar,
    TableModule,
    ReactiveFormsModule,
    Dialog,
    Toast,
    ConfirmDialog,
    InputText,
    ButtonDirective,
    Select,
    Tooltip,


  ],
  styleUrl: './masa.component.css'
})
export class MasaComponent implements OnInit {
  masaDatas = signal<MasaModel[]>([]);
  selectedMasaObject = signal<MasaModel | null>(null);
  masaKonumEnumList = signal<EnumRecord[]>([]);
  masaDurumEnumList = signal<EnumRecord[]>([]);
  masaSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);
  masaUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);
  constructor(
    private masaService: MasaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.masaSaveForm = MasaForm.masaSaveForm();
    this.masaUpdateForm = MasaForm.masaUpdateForm();
  }

  ngOnInit() {
  /*  this.getAllMasalar();*/
    this.getMasaKonumEnum();
    this.getMasaDurumEnum();
  }

  getAllMasalar() {
    this.masaService.getAllMasalar().subscribe({
      next: (res) => {
        this.masaDatas.set(res.data);
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

  getMasaKonumEnum() {
    this.masaService.getMasaKonumEnum().subscribe({
      next: (res) => {
        this.masaKonumEnumList.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Masa konumları yüklenemedi.'
        });
      }
    });
  }

  getMasaDurumEnum() {
    this.masaService.getMasaDurumEnum().subscribe({
      next: (res) => {
        this.masaDurumEnumList.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Masa durumları yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllMasalar();
    this.selectedMasaObject.set(null);
  }

  showSaveForm() {
    this.masaSaveForm.reset();
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.masaSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveMasa() {
    if (this.masaSaveForm.valid) {
      this.masaService.saveMasa(this.masaSaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Masa kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Masa kaydedilemedi.'
          });
        }
      });
    }
  }

  showUpdateForm() {
    if (this.selectedMasaObject()) {
      this.masaUpdateForm.patchValue(this.selectedMasaObject()!);
      this.displayUpdateForm.set(true);
    }
  }

  closeUpdateForm() {
    this.masaUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateMasa() {
    if (this.masaUpdateForm.valid) {
      this.masaService.updateMasa(this.masaUpdateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Masa güncellendi.'
          });
          this.refresh();
          this.closeUpdateForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Masa güncellenemedi.'
          });
        }
      });
    }
  }

  deleteMasaConfirm(event: any) {
    if (!this.selectedMasaObject()) return;
    this.confirmationService.confirm({
      message: 'Bu masayı silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteMasa();
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

  deleteMasa() {
    const id = this.selectedMasaObject()?.id;
    if (id) {
      this.masaService.deleteMasa(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Masa silindi.'
          });
          this.refresh();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Masa silinemedi.'
          });
        }
      });
    }
  }
}
