import {Component, OnInit, signal} from '@angular/core';
import {OdemeModel, SiparisOption} from '../model/odeme/odeme.model';
import {EnumRecord, MasaModel} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {OdemeService} from '../services/odeme/odeme.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {OdemeForm} from '../model/odeme/odeme.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {SiparisService} from '../services/siparis/siparis.service';

@Component({
  selector: 'app-odeme',


  templateUrl: './odeme.component.html',
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
  styleUrl: './odeme.component.css'
})
export class OdemeComponent implements OnInit {
  odemeDatas = signal<OdemeModel[]>([]);
  selectedOdemeObject = signal<OdemeModel | null>(null);
  siparisOptions = signal<SiparisOption[]>([]);
  odemeTurOptions = signal<EnumRecord[]>([]);

  odemeSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  odemeUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);
  selectedProduct!: MasaModel;

  metaKey: boolean = true;

  constructor(
    private odemeService: OdemeService,
    private siparisService: SiparisService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.odemeSaveForm = OdemeForm.odemeSaveForm();
    this.odemeUpdateForm = OdemeForm.odemeUpdateForm();
  }

  ngOnInit() {
    this.getAllOdemeler();
    this.getSiparisOptions();
    this.getOdemeTurOptions();
  }

  getAllOdemeler() {
    this.odemeService.getAllOdemeler().subscribe({
      next: (res) => {
        this.odemeDatas.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödemeler yüklenemedi.'
        });
      }
    });
  }

  getSiparisOptions() {
    this.siparisService.getAllSiparisler().subscribe({
      next: (res) => {
        this.siparisOptions.set(res.data);
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

  getOdemeTurOptions() {
    this.odemeService.getOdemeTurEnum().subscribe({
      next: (res) => {
        this.odemeTurOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödeme türleri yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllOdemeler();
    this.selectedOdemeObject.set(null);
  }

  showSaveForm() {
    this.odemeSaveForm.reset();
    this.odemeSaveForm.patchValue({odemeZamani: new Date()});
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.odemeSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveOdeme() {
    if (this.odemeSaveForm.valid) {
      this.odemeService.saveOdeme(this.odemeSaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Ödeme kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Ödeme kaydedilemedi.'
          });
        }
      });
    }
  }


  showUpdateForm() {
    this.odemeUpdateForm.reset({
      id: this.selectedOdemeObject()?.id
    });
    this.odemeService.getOdemeById(this.selectedOdemeObject()?.id).subscribe(res => {
      this.displayUpdateForm.set(true);

      this.odemeUpdateForm.patchValue({
        ...res.data,

      });

    })
  }


  closeUpdateForm() {
    this.odemeUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateOdeme() {

    this.odemeService.updateOdeme(this.odemeUpdateForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Ödeme güncellendi.'
        });
        this.refresh();
        this.closeUpdateForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödeme güncellenemedi.'
        });
      }
    });
  }


  deleteOdemeConfirm(event: any) {

    this.confirmationService.confirm({
      message: 'Bu ödemeyi silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteOdeme();
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

  deleteOdeme() {
    const id = this.selectedOdemeObject()?.id;

    this.odemeService.deleteOdeme(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Ödeme silindi.'
        });
        this.refresh();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödeme silinemedi.'
        });
      }
    });
  }

}
