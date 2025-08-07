import {Component, OnInit, signal} from '@angular/core';
import {SiparisKalemiModel, SiparisOption} from '../model/siparis-kalem/siparis-kalem.model';
import {MenuItemOption} from '../model/menu-fiyat/menu-fiyat.model';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SiparisKalemiService} from '../services/siparis-kalem/siparis-kalem.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SiparisKalemiForm} from '../model/siparis-kalem/siparis-kalem.form';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Toast} from 'primeng/toast';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {InputText} from 'primeng/inputtext';
import {Tooltip} from 'primeng/tooltip';
import {MasaModel} from '../model/masa/masa.model';

@Component({
  selector: 'app-siparis-kalem',


  templateUrl: './siparis-kalem.component.html',
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
    Tooltip
  ],
  styleUrl: './siparis-kalem.component.css'
})

export class SiparisKalemiComponent implements OnInit {
  siparisKalemiDatas = signal<SiparisKalemiModel[]>([]);
  selectedSiparisKalemiObject = signal<SiparisKalemiModel | null>(null);
  siparisOptions = signal<SiparisOption[]>([]);
  menuItemOptions = signal<MenuItemOption[]>([]);

  siparisKalemiSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  siparisKalemiUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);
  selectedProduct!: MasaModel;

  metaKey: boolean = true;

  constructor(
    private siparisKalemiService: SiparisKalemiService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.siparisKalemiSaveForm = SiparisKalemiForm.siparisKalemiSaveForm();
    this.siparisKalemiUpdateForm = SiparisKalemiForm.siparisKalemiUpdateForm();
  }

  ngOnInit() {
    this.getAllSiparisKalemleri();
    this.getSiparisOptions();
    this.getMenuItemOptions();
  }

  getAllSiparisKalemleri() {
    this.siparisKalemiService.getAllSiparisKalemleri().subscribe({
      next: (res) => {
        this.siparisKalemiDatas.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Sipariş kalemleri yüklenemedi.'
        });
      }
    });
  }

  getSiparisOptions() {
    this.siparisKalemiService.getAllSiparisler().subscribe({
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

  getMenuItemOptions() {
    this.siparisKalemiService.getAllMenuItems().subscribe({
      next: (res) => {
        this.menuItemOptions.set(res.data);
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
    this.getAllSiparisKalemleri();
    this.selectedSiparisKalemiObject.set(null);
  }

  showSaveForm() {
    this.siparisKalemiSaveForm.reset({adet: 1});
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.siparisKalemiSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveSiparisKalemi() {

    this.siparisKalemiService.saveSiparisKalemi(this.siparisKalemiSaveForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Sipariş kalemi kaydedildi.'
        });
        this.refresh();
        this.closeSaveForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Sipariş kalemi kaydedilemedi.'
        });
      }
    });
  }


  showUpdateForm() {
    this.siparisKalemiUpdateForm.reset({
      id: this.selectedSiparisKalemiObject()?.id
    });
    this.siparisKalemiService.getSiparisKalemiById(this.selectedSiparisKalemiObject()?.id).subscribe(res => {
      this.displayUpdateForm.set(true);
      this.siparisKalemiUpdateForm.patchValue({
        ...res.data,
        /*  menuItem: res.data.id*/


      });

    })
  }

  closeUpdateForm() {
    this.siparisKalemiUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateSiparisKalemi() {

    this.siparisKalemiService.updateSiparisKalemi(this.siparisKalemiUpdateForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Sipariş kalemi güncellendi.'
        });
        this.refresh();
        this.closeUpdateForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Sipariş kalemi güncellenemedi.'
        });
      }
    });
  }


  deleteSiparisKalemiConfirm(event: any) {

    this.confirmationService.confirm({
      message: 'Bu sipariş kalemini silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteSiparisKalemi();
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

  deleteSiparisKalemi() {
    const id = this.selectedSiparisKalemiObject()?.id;

    this.siparisKalemiService.deleteSiparisKalemi(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Sipariş kalemi silindi.'
        });
        this.refresh();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Sipariş kalemi silinemedi.'
        });
      }
    });
  }

}
