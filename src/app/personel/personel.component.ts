import {Component, OnInit, signal} from '@angular/core';
import {PersonelModel} from '../model/personel/personel.model';
import {EnumRecord} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {PersonelService} from '../services/personel/personel.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {PersonelForm} from '../model/personel/personel.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-personel',


  templateUrl: './personel.component.html',
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
  styleUrl: './personel.component.css'
})

export class PersonelComponent implements OnInit {
  personelDatas = signal<PersonelModel[]>([]);
  selectedPersonelObject = signal<PersonelModel | null>(null);
  rolOptions = signal<EnumRecord[]>([]);

  personelSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  personelUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

  constructor(
    private personelService: PersonelService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.personelSaveForm = PersonelForm.personelSaveForm();
    this.personelUpdateForm = PersonelForm.personelUpdateForm();
  }

  ngOnInit() {
    this.getAllPersoneller();
    this.getRolOptions();
  }

  getAllPersoneller() {
    this.personelService.getAllPersoneller().subscribe({
      next: (res) => {
        this.personelDatas.set(res.data);
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

  getRolOptions() {
    this.personelService.getRolEnum().subscribe({
      next: (res) => {
        this.rolOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Roller yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllPersoneller();
    this.selectedPersonelObject.set(null);
  }

  showSaveForm() {
    this.personelSaveForm.reset();
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.personelSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  savePersonel() {
    if (this.personelSaveForm.valid) {
      this.personelService.savePersonel(this.personelSaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Personel kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Personel kaydedilemedi.'
          });
        }
      });
    }
  }

  showUpdateForm() {
    if (this.selectedPersonelObject()) {
      this.personelUpdateForm.patchValue(this.selectedPersonelObject()!);
      this.displayUpdateForm.set(true);
    }
  }

  closeUpdateForm() {
    this.personelUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updatePersonel() {
    if (this.personelUpdateForm.valid) {
      this.personelService.updatePersonel(this.personelUpdateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Personel güncellendi.'
          });
          this.refresh();
          this.closeUpdateForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Personel güncellenemedi.'
          });
        }
      });
    }
  }

  deletePersonelConfirm(event: any) {
    if (!this.selectedPersonelObject()) return;
    this.confirmationService.confirm({
      message: 'Bu personeli silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deletePersonel();
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

  deletePersonel() {
    const id = this.selectedPersonelObject()?.id;
    if (id) {
      this.personelService.deletePersonel(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Personel silindi.'
          });
          this.refresh();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Personel silinemedi.'
          });
        }
      });
    }
  }
}
