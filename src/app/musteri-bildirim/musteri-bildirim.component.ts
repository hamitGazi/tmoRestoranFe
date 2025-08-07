import {Component, OnInit, signal} from '@angular/core';

import {EnumRecord, MasaModel} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MusteriBildirimService} from '../services/musteri-bildirim/musteri-bildirim.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MusteriBildirimForm} from '../model/musteri-bildirim/musteri-bildirim.form';
import {Toolbar} from 'primeng/toolbar';
import {Button, ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {InputText} from 'primeng/inputtext';
import {DatePicker} from 'primeng/datepicker';
import {MusteriBildirimModel} from '../model/musteri-bildirim/musteri-bildirim.model';
import {MusteriOption} from '../model/rezervasyon/rezervasyon.model';

@Component({
  selector: 'app-musteri-bildirim',


  templateUrl: './musteri-bildirim.component.html',
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

  ],
  styleUrl: './musteri-bildirim.component.css'
})

export class MusteriBildirimComponent implements OnInit {
  musteriBildirimDatas = signal<MusteriBildirimModel[]>([]);
  selectedMusteriBildirimObject = signal<MusteriBildirimModel | null>(null);
  musteriOptions = signal<MusteriOption[]>([]);
  geriBildirimTurEnumList = signal<EnumRecord[]>([]);

  musteriBildirimSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  musteriBildirimUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);
  selectedProduct!: MasaModel;

  metaKey: boolean = true;
  constructor(
    private musteriBildirimService: MusteriBildirimService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.musteriBildirimSaveForm = MusteriBildirimForm.musteriBildirimSaveForm();
    this.musteriBildirimUpdateForm = MusteriBildirimForm.musteriBildirimUpdateForm();
  }

  ngOnInit() {
    this.getAllMusteriBildirimler();
    this.getGeriBildirimTurEnum();
  }

  getAllMusteriBildirimler() {
    this.musteriBildirimService.getAllMusteriBildirimler().subscribe({
      next: (res) => {
        this.musteriBildirimDatas.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Bildirimler yüklenemedi.'
        });
      }
    });
  }

  getGeriBildirimTurEnum() {
    this.musteriBildirimService.getBildirimTurEnum().subscribe({
      next: (res) => {
        this.geriBildirimTurEnumList.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Bildirim türleri yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllMusteriBildirimler();
    this.selectedMusteriBildirimObject.set(null);
  }

  showSaveForm() {
    this.musteriBildirimSaveForm.reset();
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.musteriBildirimSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveMusteriBildirim() {
    if (this.musteriBildirimSaveForm.valid) {
      this.musteriBildirimService.saveMusteriBildirim(this.musteriBildirimSaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Bildirim kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Bildirim kaydedilemedi.'
          });
        }
      });
    }
  }


  showUpdateForm() {
    this.musteriBildirimUpdateForm.reset({
      id:this.selectedMusteriBildirimObject()?.id
    });
    this.musteriBildirimService.getMusteriBildirimById(this.selectedMusteriBildirimObject()?.id).subscribe(res=>{
      this.displayUpdateForm.set(true);
      this.musteriBildirimUpdateForm.patchValue( {...res.data});
    })

  }
  closeUpdateForm() {
    this.musteriBildirimUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateMusteriBildirim() {

      this.musteriBildirimService.updateMusteriBildirim(this.musteriBildirimUpdateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Bildirim güncellendi.'
          });
          this.refresh();
          this.closeUpdateForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Bildirim güncellenemedi.'
          });
        }
      });
    }


  deleteMusteriBildirimConfirm(event: any) {
    if (!this.selectedMusteriBildirimObject()) return;
    this.confirmationService.confirm({
      message: 'Bu bildirimi silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteMusteriBildirim();
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

  deleteMusteriBildirim() {
    const id = this.selectedMusteriBildirimObject()?.id;
    if (id) {
      this.musteriBildirimService.deleteMusteriBildirim(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Bildirim silindi.'
          });
          this.refresh();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Bildirim silinemedi.'
          });
        }
      });
    }
  }
}
