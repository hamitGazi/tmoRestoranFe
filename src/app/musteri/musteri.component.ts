import {Component, OnInit, signal} from '@angular/core';
import {MusteriModel} from '../model/musteri/musteri.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MusteriService} from '../services/musteri/musteri.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MusteriForm} from '../model/musteri/musteri.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {InputText} from 'primeng/inputtext';
import {MasaModel} from '../model/masa/masa.model';

@Component({
  selector: 'app-musteri',


  templateUrl: './musteri.component.html',
  imports: [
    Toolbar,
    Button,
    TableModule,
    ReactiveFormsModule,
    Dialog,
    Toast,
    ConfirmDialog,
    InputText
  ],
  styleUrl: './musteri.component.css'
})

export class MusteriComponent implements OnInit {
  musteriDatas = signal<MusteriModel[]>([]);
  selectedMusteriObject = signal<MusteriModel | null>(null);

  musteriSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  musteriUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

  selectedProduct!: MasaModel;

  metaKey: boolean = true;

  constructor(
    private musteriService: MusteriService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.musteriSaveForm = MusteriForm.musteriSaveForm();
    this.musteriUpdateForm = MusteriForm.musteriUpdateForm();
  }

  ngOnInit() {
    this.getAllMusteriler();
  }

  getAllMusteriler() {
    this.musteriService.getAllMusteriler().subscribe({
      next: (res) => {
        this.musteriDatas.set(res.data);
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

  refresh() {
    this.getAllMusteriler();
    this.selectedMusteriObject.set(null);
  }

  showSaveForm() {
    this.musteriSaveForm.reset();
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.musteriSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveMusteri() {

      this.musteriService.saveMusteri(this.musteriSaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Müşteri kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Müşteri kaydedilemedi.'
          });
        }
      });
    }

  showUpdateForm() {
    this.musteriUpdateForm.reset({
      id: this.selectedMusteriObject()?.id
    });
    this.musteriService.getMusteriById(this.selectedMusteriObject()?.id).subscribe(res=>{
      this.displayUpdateForm.set(true);


      this.musteriUpdateForm.patchValue( {...res.data,
      /*  menuItem: res.data.id*/


      });

    })
  }

  closeUpdateForm() {
    this.musteriUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateMusteri() {

      this.musteriService.updateMusteri(this.musteriUpdateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Müşteri güncellendi.'
          });
          this.refresh();
          this.closeUpdateForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Müşteri güncellenemedi.'
          });
        }
      });
    }


  deleteMusteriConfirm(event: any) {
    if (!this.selectedMusteriObject()) return;
    this.confirmationService.confirm({
      message: 'Bu müşteriyi silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteMusteri();
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

  deleteMusteri() {
    const id = this.selectedMusteriObject()?.id;
    if (id) {
      this.musteriService.deleteMusteri(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Müşteri silindi.'
          });
          this.refresh();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Müşteri silinemedi.'
          });
        }
      });
    }
  }
}
