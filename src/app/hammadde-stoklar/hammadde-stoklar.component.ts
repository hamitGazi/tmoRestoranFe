import {Component, OnInit, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Dialog} from 'primeng/dialog';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {TableModule} from 'primeng/table';
import {Toast} from 'primeng/toast';
import {Toolbar} from 'primeng/toolbar';
import {Tooltip} from 'primeng/tooltip';
import {MenuItemOption, StokModel} from '../model/stok/stok.model';
import {EnumRecord} from '../model/masa/masa.model';
import {StokService} from '../services/stok/stok.service';
import {MenuItemService} from '../services/menu-item/menu-item.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {StokForm} from '../model/stok/stok.form';
import {Checkbox} from 'primeng/checkbox';

@Component({
  selector: 'app-hammadde-stoklar',

  templateUrl: './hammadde-stoklar.component.html',
  imports: [
    Button,
    ConfirmDialog,
    Dialog,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    Select,
    TableModule,
    Toast,
    Toolbar,
    Checkbox
  ],
  styleUrl: './hammadde-stoklar.component.css'
})
export class HammaddeStoklarComponent  implements OnInit {

  stokDatas = signal<StokModel[]>([]);
  selectedStokObject = signal<StokModel | null>(null);
  birimOptions = signal<EnumRecord[]>([]);
  menuItemOptions = signal<MenuItemOption[]>([]);

  stokSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  stokUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);

  selectedProduct!: StokModel;

  metaKey: boolean = true;

  constructor(
    private stokService: StokService,
    private menuItemService: MenuItemService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.stokSaveForm = StokForm.stokSaveForm();
    this.stokUpdateForm = StokForm.stokUpdateForm();
  }

  ngOnInit() {
    this.getAllStoklar();
    this.getBirimOptions();
 /*   this.getMenuItemOptions();*/
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
    this.menuItemService.getAllMenuItems().subscribe({
      next: (res) => {
        this.menuItemOptions.set(res.data);
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
    this.stokSaveForm.reset({
      aktif:true
    });
    this.stokSaveForm.patchValue({birim: 'ADET'});
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.stokSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveStok() {
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

  showUpdateForm() {
    this.stokUpdateForm.reset();
    this.stokService.getStokById(this.selectedStokObject()?.id).subscribe(res => {
      this.displayUpdateForm.set(true);
      this.stokUpdateForm.patchValue({
        ...res.data,


      });

    })
  }

  closeUpdateForm() {
    this.stokUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateStok() {

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


  deleteStokConfirm(event: any) {

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



