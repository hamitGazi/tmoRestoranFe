import {Component, OnInit, signal} from '@angular/core';
import {MenuFiyatModel, MenuItemOption} from '../model/menu-fiyat/menu-fiyat.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MenuFiyatService} from '../services/menu-fiyat/menu-fiyat.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MenuFiyatForm} from '../model/menu-fiyat/menu-fiyat.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Checkbox} from 'primeng/checkbox';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-menu-fiyat',


  templateUrl: './menu-fiyat.component.html',
  imports: [
    Toolbar,
    Button,
    TableModule,
    ReactiveFormsModule,
    Dialog,
    Select,
    Checkbox,
    Toast,
    ConfirmDialog
  ],
  styleUrl: './menu-fiyat.component.css'
})
export class MenuFiyatComponent implements OnInit {
  menuFiyatDatas = signal<MenuFiyatModel[]>([]);
  selectedMenuFiyatObject = signal<MenuFiyatModel | null>(null);
  menuItemOptions = signal<MenuItemOption[]>([]);

  menuFiyatSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  menuFiyatUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

  constructor(
    private menuFiyatService: MenuFiyatService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.menuFiyatSaveForm = MenuFiyatForm.menuFiyatSaveForm();
    this.menuFiyatUpdateForm = MenuFiyatForm.menuFiyatUpdateForm();
  }

  ngOnInit() {
    this.getAllMenuFiyatlar();
    this.getMenuItemOptions();
  }

  getAllMenuFiyatlar() {
    this.menuFiyatService.getAllMenuFiyatlar().subscribe({
      next: (res) => {
        this.menuFiyatDatas.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Fiyatlar yüklenemedi.'
        });
      }
    });
  }

  getMenuItemOptions() {
    this.menuFiyatService.getAllMenuItems().subscribe({
      next: (res) => {
        this.menuItemOptions.set(res.data.map(item => ({ id: item.id, ad: item.ad })));
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Menü ürünleri yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllMenuFiyatlar();
    this.selectedMenuFiyatObject.set(null);
  }

  showSaveForm() {
    this.menuFiyatSaveForm.reset();
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.menuFiyatSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveMenuFiyat() {
    if (this.menuFiyatSaveForm.valid) {
      this.menuFiyatService.saveMenuFiyat(this.menuFiyatSaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Fiyat kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Fiyat kaydedilemedi.'
          });
        }
      });
    }
  }

  showUpdateForm() {
    if (this.selectedMenuFiyatObject()) {
      this.menuFiyatUpdateForm.patchValue(this.selectedMenuFiyatObject()!);
      this.displayUpdateForm.set(true);
    }
  }

  closeUpdateForm() {
    this.menuFiyatUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateMenuFiyat() {
    if (this.menuFiyatUpdateForm.valid) {
      this.menuFiyatService.updateMenuFiyat(this.menuFiyatUpdateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Fiyat güncellendi.'
          });
          this.refresh();
          this.closeUpdateForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Fiyat güncellenemedi.'
          });
        }
      });
    }
  }

  deleteMenuFiyatConfirm(event: any) {
    if (!this.selectedMenuFiyatObject()) return;
    this.confirmationService.confirm({
      message: 'Bu fiyatı silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteMenuFiyat();
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

  deleteMenuFiyat() {
    const id = this.selectedMenuFiyatObject()?.id;
    if (id) {
      this.menuFiyatService.deleteMenuFiyat(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Fiyat silindi.'
          });
          this.refresh();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Fiyat silinemedi.'
          });
        }
      });
    }
  }
}
