import {Component, OnInit, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MenuItemService} from '../services/menu-item/menu-item.service';
import {StokService} from '../services/stok/stok.service';
import {ListReceteForm} from '../model/menuItemRecete/menuItemRecete.form';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {Button, ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Toast} from 'primeng/toast';
import {EnumRecord, MasaModel} from '../model/masa/masa.model';
import {MenuItemReceteService} from '../services/menuItemRecete/menuItemRecete.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {Tooltip} from 'primeng/tooltip';
import {IconField} from 'primeng/iconfield';
import {Toolbar} from 'primeng/toolbar';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ReceteModel} from '../model/menuItemRecete/menuItemRecete.model';
import {OdemeModel} from '../model/odeme/odeme.model';


@Component({
  selector: 'app-menu-item-recete',
  templateUrl: './menu-item-recete.component.html',
  imports: [
    ReactiveFormsModule,
    Dialog,
    Select,
    Button,
    TableModule,
    Toast,
    InputText,
    InputNumber,
    Tooltip,
    IconField,
    Toolbar,
    ConfirmDialog,

  ],
  styleUrl: './menu-item-recete.component.css'
})
export class MenuItemReceteComponent implements OnInit {
  receteSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);
  receteUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);
  menuUrunleri = signal<any[]>([]);
  stokKalemleri = signal<any[]>([]);
  menuItemReceteDatas = signal<ReceteModel[]>([]);
  selectedMalzeme = signal<ReceteModel | null>(null);
  birimOptions = signal<EnumRecord[]>([]);
  selectedProduct!: ReceteModel;
  metaKey: boolean = true;

  constructor(
    private menuItemService: MenuItemService,
    private stokService: StokService,
    private confirmationService: ConfirmationService,
    private menuItemReceteService: MenuItemReceteService,
    private messageService: MessageService
  ) {
    this.receteSaveForm = ListReceteForm.receteSaveForm();
    this.receteUpdateForm = ListReceteForm.receteUpdateForm();

  }

  ngOnInit() {
    this.getMenuUrunOptions();
    this.getStokKalemOptions();
    this.getBirimOptions();

  }

  getMenuUrunOptions() {
    this.menuItemService.getAllMenuItems().subscribe({
      next: (res) => this.menuUrunleri.set(res.data),
      error: () => this.showError('Menü öğeleri yüklenemedi.')
    });
  }

  getStokKalemOptions() {
    this.stokService.getAllStoklar().subscribe({
      next: (res) => this.stokKalemleri.set(res.data),
      error: () => this.showError('Stok kalemleri yüklenemedi.')
    });
  }
  getMenuItemRecetelerOptions() {
    this.menuItemReceteService.getAllReceteler().subscribe({
      next: (res) => this.menuItemReceteDatas.set(res.data),
      error: () => this.showError('Stok kalemleri yüklenemedi.')
    });
  }

  getBirimOptions() {
    this.menuItemReceteService.getBirimEnum().subscribe({
      next: (res) => this.birimOptions.set(res.data),
      error: () => this.showError('Birim enumları yüklenemedi.')
    });
  }
  getSiraliReceteKalemByMenuUrun(mnuUrunId: any) {
    this.menuItemReceteService.getSiraliReceteKalemByMenuUrunId(mnuUrunId).subscribe({
      next: (res) => this.menuItemReceteDatas.set(res.data),

      error: () => this.showError('Stok kalemleri yüklenemedi.')
    });
  }



  addMalzeme() {
    const menuUrunId=this.receteSaveForm.get("menuUrunId")?.value
    console.log("menuItemId", menuUrunId);

    if (this.receteSaveForm.valid) {
      this.menuItemReceteService.saveRecete(this.receteSaveForm.value).subscribe({
        next: () => {
          this.showSuccess('Reçete kaydedildi.');

          this.getSiraliReceteKalemByMenuUrun(menuUrunId);
          this.receteSaveForm.reset({miktar: 0, menuUrunId:menuUrunId,stokKalemiId: null, birim: null});
        },
        error: () => this.showError('Reçete kaydedilemedi.')
      });
    } else {
      this.showError('Lütfen malzeme, miktar ve birim girin.');
    }

  }

  showAddMalzemeForm() {
    this.displaySaveForm.set(true);
    this.receteSaveForm.reset({miktar: 0, stokKalemiId: null, birim: null});
  }

  closeSaveForm() {
    this.receteSaveForm.reset();
    this.receteSaveForm.reset({miktar: 0, stokKalemiId: null, birim: null});
    this.displaySaveForm.set(false);
  }

  saveRecete() {
    if (this.receteSaveForm.valid) {
      this.menuItemReceteService.saveRecete(this.receteSaveForm.value).subscribe({
        next: () => {

          this.showSuccess('Reçete kaydedildi.');
          this.closeSaveForm();
          this.refresh();
        },
        error: () => this.showError('Reçete kaydedilemedi.')
      });
    } else {
      this.showError('Lütfen malzeme, miktar ve birim girin.');
    }

  }

  showUpdateMalzemeForm() {

    this.receteUpdateForm.reset();
    this.menuItemReceteService.getReceteById(this.selectedMalzeme()?.id).subscribe(res => {

      this.receteUpdateForm.patchValue({
        ...res.data,
        menuUrunId: res.data?.menuItemId?.id,
        stokKalemiId: res.data?.stokKalemId?.id,
      });
      this.displayUpdateForm.set(true);
    });

  }

  closeUpdateForm() {
    this.receteUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateRecete() {
      this.menuItemReceteService.updateRecete(this.receteUpdateForm.value).subscribe({
        next: () => {
          this.showSuccess('Reçete kaydedildi.');
          this.closeUpdateForm();
          this.getMenuItemRecetelerOptions();
        },
        error: () => this.showError('Reçete kaydedilemedi.')
      });


  }
  private showError(detail: string) {
    this.messageService.add({severity: 'error', summary: 'Hata', detail});
  }

  private showSuccess(detail: string) {
    this.messageService.add({severity: 'success', summary: 'Başarılı', detail});
  }



  refresh() {
    this.getMenuUrunOptions();
    this.getStokKalemOptions();
    this.getBirimOptions();
    this.menuItemReceteDatas.set([]);


  }removeMalzeme(index: number) {
    let items: any[] = [];
    this.menuItemReceteDatas.update(currentItems => {
      items = currentItems;
      return currentItems;
    });

    const id = items[index]?.id;
    if (id) {
      this.deleteMenuFiyatConfirm(id);
    }
  }

  deleteMenuFiyatConfirm(id: any) {
    this.confirmationService.confirm({
      message: ' Silmek istediğinize emin misiniz?',
      header: 'Silme Onayı',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-success p-button-text success-border',
      rejectButtonStyleClass: 'p-button-danger p-button-text danger-border',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      accept: () => {
        this.deleteRecete(id); // gerçekten sil
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
  deleteRecete(id: any) {
    this.menuItemReceteService.deleteRecete(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Menü ürünü silindi.'
        });
        this.getMenuItemRecetelerOptions();

      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Fiyat silinemedi.'
        });
      }
    });
  }

  onChangeMenuUrun(e:any) {

     this.getSiraliReceteKalemByMenuUrun(e.value);

  }
}
