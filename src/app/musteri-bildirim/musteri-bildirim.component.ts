import {Component, OnInit, signal} from '@angular/core';
import {MusteriBildirimModel, MusteriOption} from '../model/musteri-bildirim/musteri-bildirim.model';
import {EnumRecord} from '../model/masa/masa.model';
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
    ButtonDirective,
    Toast,
    ConfirmDialog
  ],
  styleUrl: './musteri-bildirim.component.css'
})

export class MusteriBildirimComponent implements OnInit {
  musteriBildirimDatas = signal<MusteriBildirimModel[]>([]);
  selectedMusteriBildirimObject = signal<MusteriBildirimModel | null>(null);
  musteriOptions = signal<MusteriOption[]>([]);
  bildirimTurOptions = signal<EnumRecord[]>([]);

  musteriBildirimSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  musteriBildirimUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

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
    this.getMusteriOptions();
    this.getBildirimTurOptions();
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

  getMusteriOptions() {
    this.musteriBildirimService.getAllMusteriler().subscribe({
      next: (res) => {
        this.musteriOptions.set(res.data.map(musteri => ({ id: musteri.id, ad: musteri.ad + ' ' + musteri.soyad })));
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

  getBildirimTurOptions() {
    this.musteriBildirimService.getBildirimTurEnum().subscribe({
      next: (res) => {
        this.bildirimTurOptions.set(res.data);
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
    this.musteriBildirimSaveForm.patchValue({ bildirimZamani: new Date() });
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
    if (this.selectedMusteriBildirimObject()) {
      this.musteriBildirimUpdateForm.patchValue(this.selectedMusteriBildirimObject()!);
      this.displayUpdateForm.set(true);
    }
  }

  closeUpdateForm() {
    this.musteriBildirimUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateMusteriBildirim() {
    if (this.musteriBildirimUpdateForm.valid) {
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
