import {Component, OnInit, signal} from '@angular/core';
import {KullaniciModel, KullaniciSifreDegistirModel} from '../model/kullanici/kullanici.model';
import {EnumRecord} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {KullaniciService} from '../services/kullanici/kullanici.servicel';
import {ConfirmationService, MessageService} from 'primeng/api';
import {KullaniciForm} from '../model/kullanici/kullanici.form';
import {Toolbar} from 'primeng/toolbar';
import {Button, ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Password} from 'primeng/password';
import {Select} from 'primeng/select';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-kullanici',


  templateUrl: './kullanici.component.html',
  imports: [
    Toolbar,
    Button,
    TableModule,
    ReactiveFormsModule,
    Dialog,
    Password,
    Select,
    Toast,
    ConfirmDialog,
    ButtonDirective
  ],
  styleUrl: './kullanici.component.css'
})

export class KullaniciComponent implements OnInit {
  kullaniciDatas = signal<KullaniciModel[]>([]);
  selectedKullaniciObject = signal<KullaniciModel | null>(null);
  rolOptions = signal<EnumRecord[]>([]);

  kullaniciSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  kullaniciUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

  sifreDegistirForm!: FormGroup;
  displaySifreDegistirForm = signal<boolean>(false);

  constructor(
    private kullaniciService: KullaniciService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.kullaniciSaveForm = KullaniciForm.kullaniciSaveForm();
    this.kullaniciUpdateForm = KullaniciForm.kullaniciUpdateForm();
    this.sifreDegistirForm = KullaniciForm.sifreDegistirForm();
  }

  ngOnInit() {
    this.getAllKullanicilar();
    this.getRolOptions();
  }

  getAllKullanicilar() {
    this.kullaniciService.getAllKullanicilar().subscribe({
      next: (res) => {
        this.kullaniciDatas.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Kullanıcılar yüklenemedi.'
        });
      }
    });
  }

  getRolOptions() {
    this.kullaniciService.getRolEnum().subscribe({
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
    this.getAllKullanicilar();
    this.selectedKullaniciObject.set(null);
  }

  showSaveForm() {
    this.kullaniciSaveForm.reset();
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.kullaniciSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveKullanici() {
    if (this.kullaniciSaveForm.valid) {
      this.kullaniciService.saveKullanici(this.kullaniciSaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Kullanıcı kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Kullanıcı kaydedilemedi.'
          });
        }
      });
    }
  }

  showUpdateForm() {
    if (this.selectedKullaniciObject()) {
      this.kullaniciUpdateForm.patchValue(this.selectedKullaniciObject()!);
      this.displayUpdateForm.set(true);
    }
  }

  closeUpdateForm() {
    this.kullaniciUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateKullanici() {
    if (this.kullaniciUpdateForm.valid) {
      this.kullaniciService.updateKullanici(this.kullaniciUpdateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Kullanıcı güncellendi.'
          });
          this.refresh();
          this.closeUpdateForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Kullanıcı güncellenemedi.'
          });
        }
      });
    }
  }

  showSifreDegistirForm() {
    if (this.selectedKullaniciObject()) {
      this.sifreDegistirForm.reset();
      this.displaySifreDegistirForm.set(true);
    }
  }

  closeSifreDegistirForm() {
    this.sifreDegistirForm.reset();
    this.displaySifreDegistirForm.set(false);
  }

  degistirSifre() {
    if (this.sifreDegistirForm.valid && this.selectedKullaniciObject()) {
      const data: KullaniciSifreDegistirModel = {
        id: this.selectedKullaniciObject()!.id,
        yeniSifre: this.sifreDegistirForm.value.yeniSifre
      };
      this.kullaniciService.degistirSifre(data).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Şifre değiştirildi.'
          });
          this.closeSifreDegistirForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Şifre değiştirilemedi.'
          });
        }
      });
    }
  }

  deleteKullaniciConfirm(event: any) {
    if (!this.selectedKullaniciObject()) return;
    this.confirmationService.confirm({
      message: 'Bu kullanıcıyı silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteKullanici();
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

  deleteKullanici() {
    const id = this.selectedKullaniciObject()?.id;
    if (id) {
      this.kullaniciService.deleteKullanici(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Kullanıcı silindi.'
          });
          this.refresh();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Kullanıcı silinemedi.'
          });
        }
      });
    }
  }
}
