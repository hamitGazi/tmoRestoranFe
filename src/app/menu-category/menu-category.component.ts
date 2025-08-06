import {Component, OnInit, signal} from '@angular/core';
import {MenuCategoryModel} from '../model/menuCategory/menu-category.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MenuCategoryService} from '../services/menuCategory/menuCategory.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MenuCategoryForm} from '../model/menuCategory/menu-category.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Checkbox} from 'primeng/checkbox';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';

@Component({
  selector: 'app-menu-category',

  templateUrl: './menu-category.component.html',
  imports: [
    Toolbar,
    Button,
    TableModule,
    ReactiveFormsModule,
    Dialog,
    Checkbox,
    Toast,
    ConfirmDialog
  ],
  styleUrl: './menu-category.component.css'
})
export class MenuCategoryComponent implements OnInit {
  menuCategoryDatas = signal<MenuCategoryModel[]>([]);
  selectedMenuCategoryObject = signal<MenuCategoryModel | null>(null);

  menuCategorySaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  menuCategoryUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

  constructor(
    private menuCategoryService: MenuCategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.menuCategorySaveForm = MenuCategoryForm.menuCategorySaveForm();
    this.menuCategoryUpdateForm = MenuCategoryForm.menuCategoryUpdateForm();
  }

  ngOnInit() {
    this.getAllMenuCategories();
  }

  getAllMenuCategories() {
    this.menuCategoryService.getAllMenuCategories().subscribe({
      next: (res) => {
        this.menuCategoryDatas.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Menü kategorileri yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllMenuCategories();
    this.selectedMenuCategoryObject.set(null);
  }

  showSaveForm() {
    this.menuCategorySaveForm.reset();
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.menuCategorySaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveMenuCategory() {
    if (this.menuCategorySaveForm.valid) {
      this.menuCategoryService.saveMenuCategory(this.menuCategorySaveForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Menü kategorisi kaydedildi.'
          });
          this.refresh();
          this.closeSaveForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Menü kategorisi kaydedilemedi.'
          });
        }
      });
    }
  }

  showUpdateForm() {
    if (this.selectedMenuCategoryObject()) {
      this.menuCategoryUpdateForm.patchValue(this.selectedMenuCategoryObject()!);
      this.displayUpdateForm.set(true);
    }
  }

  closeUpdateForm() {
    this.menuCategoryUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateMenuCategory() {
    if (this.menuCategoryUpdateForm.valid) {
      this.menuCategoryService.updateMenuCategory(this.menuCategoryUpdateForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Menü kategorisi güncellendi.'
          });
          this.refresh();
          this.closeUpdateForm();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Menü kategorisi güncellenemedi.'
          });
        }
      });
    }
  }

  deleteMenuCategoryConfirm(event: any) {
    if (!this.selectedMenuCategoryObject()) return;
    this.confirmationService.confirm({
      message: 'Bu menü kategorisini silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteMenuCategory();
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

  deleteMenuCategory() {
    const id = this.selectedMenuCategoryObject()?.id;
    if (id) {
      this.menuCategoryService.deleteMenuCategory(id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Başarılı',
            detail: 'Menü kategorisi silindi.'
          });
          this.refresh();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Hata',
            detail: 'Menü kategorisi silinemedi.'
          });
        }
      });
    }
  }
}
