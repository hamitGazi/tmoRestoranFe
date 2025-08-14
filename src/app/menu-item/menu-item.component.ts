import {Component, OnInit, signal} from '@angular/core';
import {MenuCategoryOption, MenuItemModel} from '../model/menu-item/menu-item.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MenuItemService} from '../services/menu-item/menu-item.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MenuItemForm} from '../model/menu-item/menu-item.form';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Checkbox} from 'primeng/checkbox';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {MasaModel} from '../model/masa/masa.model';
import {MenuCategoryService} from '../services/menuCategory/menuCategory.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  imports: [
    ReactiveFormsModule,
    Dialog,
    Select,
    Checkbox,
    Toast,
    ConfirmDialog,
    InputText,
    Button,
    Toolbar,
    TableModule
  ],
  styleUrl: './menu-item.component.css'
})

export class MenuItemComponent implements OnInit {
  menuItemDatas = signal<MenuItemModel[]>([]);
  selectedMenuItemObject = signal<MenuItemModel | null>(null);
  menuCategoryOptions = signal<MenuCategoryOption[]>([]);

  menuItemSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  menuItemUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);


  selectedProduct!: MasaModel;

  metaKey: boolean = true;

  constructor(
    private menuItemService: MenuItemService,
    private menuCategoryService: MenuCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.menuItemSaveForm = MenuItemForm.menuItemSaveForm();
    this.menuItemUpdateForm = MenuItemForm.menuItemUpdateForm();
  }

  ngOnInit() {
    this.getAllMenuItems();
    this.getMenuCategoryOptions();
  }

  getAllMenuItems() {
    this.menuItemService.getAllMenuItems().subscribe({
      next: (res) => {
        this.menuItemDatas.set(res.data);
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

  getMenuCategoryOptions() {
    this.menuCategoryService.getAllMenuCategories().subscribe({
      next: (res) => {
        this.menuCategoryOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Kategoriler yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllMenuItems();
    this.selectedMenuItemObject.set(null);
  }

  showSaveForm() {
    this.menuItemSaveForm.reset({aktif: true});
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.menuItemSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveMenuItem() {
    this.menuItemService.saveMenuItem(this.menuItemSaveForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Menü ürünü kaydedildi.'
        });
        this.refresh();
        this.closeSaveForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Menü ürünü kaydedilemedi.'
        });
      }
    });
  }

  showUpdateForm() {

    this.menuItemUpdateForm.reset({
      id: this.selectedMenuItemObject()?.id,
    });
    this.menuItemService.getMenuItemById(this.selectedMenuItemObject()?.id).subscribe(res => {
      this.displayUpdateForm.set(true);
      this.menuItemUpdateForm.patchValue({
        ...res.data,
        kategoriId: res.data.kategori.id
      });
    })
  }


  closeUpdateForm() {
    this.menuItemUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateMenuItem() {
    this.menuItemService.updateMenuItem(this.menuItemUpdateForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Menü ürünü güncellendi.'
        });
        this.refresh();
        this.closeUpdateForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Menü ürünü güncellenemedi.'
        });
      }
    });
  }


  deleteMenuItemConfirm(event: any) {
    if (!this.selectedMenuItemObject()) return;
    this.confirmationService.confirm({
      message: 'Bu menü ürününü silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteMenuItem();
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

  deleteMenuItem() {
    const id = this.selectedMenuItemObject()?.id;
    if (id) {
      this.menuItemService.deleteMenuItem(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Menü ürünü silindi.'
          });
          this.refresh();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Menü ürünü silinemedi.'
          });
        }
      });
    }
  }
}
