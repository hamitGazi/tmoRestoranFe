import {Component, OnInit, signal} from '@angular/core';
import {MenuItemOption, StokModel} from '../model/stok/stok.model';
import {EnumRecord} from '../model/masa/masa.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {StokService} from '../services/stok/stok.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {StokForm} from '../model/stok/stok.form';
import {Toolbar} from 'primeng/toolbar';
import {Button, ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {InputText} from 'primeng/inputtext';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-stok',


  templateUrl: './stok.component.html',
  imports: [
    Toolbar,
    Button,
    TableModule,
    ReactiveFormsModule,
    Dialog,
    Select,
    ButtonDirective,
    InputText,
    Toast,
    ConfirmDialog
  ],
  styleUrl: './stok.component.css'
})

export class StokComponent implements OnInit {
  stokDatas = signal<StokModel[]>([]);
  selectedStokObject = signal<StokModel | null>(null);
  birimOptions = signal<EnumRecord[]>([]);
  menuItemOptions = signal<MenuItemOption[]>([]);

  stokSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  stokUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

  constructor(
    private stokService: StokService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.stokSaveForm = StokForm.stokSaveForm();
    this.stokUpdateForm = StokForm.stokUpdateForm();
  }

  ngOnInit() {
    this.getAllStoklar();
    this.getBirimOptions();
    this.getMenuItemOptions();
  }

  getAllStoklar() {
    this.stokService.getAllStoklar().subscribe({
      next: (res) => {
        this.stokDatas.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Stoklar yüklenemedi.'
        });
      }
    });
  }

  getBirimOptions() {
    this.stokService.getBirimEnum().subscribe({
      next: (res) => {
        this.birimOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Birimler yüklenemedi.'
        });
      }
    });
  }

  getMenuItemOptions() {
    this.stokService.getAllMenuItems().subscribe({
      next: (res) => {
        this.menuItemOptions.set(res.data.map(item => ({id: item.id, ad: item.ad})));
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Menü öğeleri yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllStoklar();
    this.selectedStokObject.set(null);
  }

  showSaveForm() {
    this.stokSaveForm.reset();
    this.stokSaveForm.patchValue({birim: 'ADET'});
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.stokSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveStok() {
    if (this.stokSaveForm.valid) {
      this.stokService.saveStok(this.stokSaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Stok kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Stok kaydedilemedi.'
          });
        }
      });
    }
  }

  showUpdateForm() {
    if (this.selectedStokObject()) {
      this.stokUpdateForm.patchValue(this.selectedStokObject()!);
      this.displayUpdateForm.set(true);
    }
  }

  closeUpdateForm() {
    this.stokUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateStok() {
    if (this.stokUpdateForm.valid) {
      this.stokService.updateStok(this.stokUpdateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Stok güncellendi.'
          });
          this.refresh();
          this.closeUpdateForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Stok güncellenemedi.'
          });
        }
      });
    }
  }

  deleteStokConfirm(event: any) {
    if (!this.selectedStokObject()) return;
    this.confirmationService.confirm({
      message: 'Bu stok kaydını silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteStok();
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

  deleteStok() {
    const id = this.selectedStokObject()?.id;
    if (id) {
      this.stokService.deleteStok(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Stok silindi.'
          });
          this.refresh();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Stok silinemedi.'
          });
        }
      });
    }
  }
}
