import {Component, OnInit, signal} from '@angular/core';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {Select} from 'primeng/select';
import {Button, ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {ActivatedRoute, Router} from '@angular/router';
import {SiparisKalemiModel} from '../model/siparis-kalem/siparis-kalem.model';
import {MenuCategoryOption, MenuItemOption} from '../model/stok/stok.model';
import {SiparisKalemiService} from '../services/siparis-kalem/siparis-kalem.service';
import {MenuItemService} from '../services/menu-item/menu-item.service';
import {Toolbar} from 'primeng/toolbar';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Dialog} from 'primeng/dialog';
import {SiparisKalemiForm} from '../model/siparis-kalem/siparis-kalem.form';
import {MenuCategoryService} from '../services/menuCategory/menuCategory.service';
import {MasaOption, MenuItemModel} from '../model/menu-item/menu-item.model';
import {StyleClass} from 'primeng/styleclass';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {MasaService} from '../services/masa/masa.service';
import {MasaModel} from '../model/masa/masa.model';

@Component({
  selector: 'app-siparis-kalem',
  templateUrl: './siparis-kalem.component.html',
  styleUrl: './siparis-kalem.component.css',
  imports: [
    Toolbar,
    Button,
    TableModule,
    ReactiveFormsModule,
    Select,
    InputText,
    FormsModule,
    ButtonDirective,
    CommonModule,
    Dialog,
    StyleClass,
    ConfirmDialog,
    Toast,


  ]
})
export class SiparisKalemiComponent implements OnInit {

  siparisId: number | null = null;

  siparisKalemiData=signal<SiparisKalemiModel[] >( [])
  menuItems: MenuItemOption[] = [];
  menuItemByCategoryOption = signal<MenuItemModel[]>([]);
  selectedSiparisKalemiObject: SiparisKalemiModel | null = null;
  clonedRows: { [key: number]: SiparisKalemiModel } = {};
  selectedProduct!: SiparisKalemiModel;
  metaKey: boolean = true;
  selectedKalem: any = null
  masaOptions = signal<MasaOption[]>([]);
  siparisKalemiSaveForm: FormGroup = SiparisKalemiForm.siparisKalemiSaveForm();
  displaySaveForm = signal<boolean>(false);
  menuCategoryOptions = signal<MenuCategoryOption[]>([]);

  constructor(
    private siparisKalemiService: SiparisKalemiService,
    private menuItemService: MenuItemService,
    private menuCategoryService: MenuCategoryService,
    private messageService: MessageService,
    private masaService: MasaService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {


    const siparisIdParam = this.route.snapshot.queryParams['siparisId'];
    const siparisId = siparisIdParam ? +siparisIdParam : null;
    if (!siparisId) {
      this.messageService.add({severity: 'warn', summary: 'Uyarı', detail: 'Sipariş ID belirtilmedi.'});
      this.router.navigate(['/siparis-kalemi']);
      this.refresh()
      return;
    }
    this.siparisId = siparisId;
    this.loadSiparisKalemleri(siparisId);
    this.loadMenuItems();
    this.loadMenuCategory();
    this.loadAllMasalar()

  }

  menuItemSelectList(): SelectItem[] {
    return this.menuItems.map(m => ({label: m.ad, value: m.id}));
  }


loadAllMasalar(): void {
this.masaService.getAllMasalar().subscribe( {
  next: (res) => this.masaOptions.set( res.data || []),
  error: () => this.showError('Sipariş kalemleri yüklenemedi.')
});


}
  loadSiparisKalemleri(siparisId: any) {
    if (!siparisId) {
      console.error('loadSiparisKalemleri çağrıldı, ancak siparisId null veya tanımlı değil!');
      this.showError('Sipariş ID tanımlı değil!');
      return;
    }
    this.siparisKalemiService.getKalemlerBySiparisId(siparisId).subscribe({
      next: (res) => this.siparisKalemiData.set(res.data || []),
      error: () => this.showError('Sipariş kalemleri yüklenemedi.')
    });
  }

  loadMenuCategory() {
    this.menuCategoryService.getAllMenuCategories().subscribe({
      next: (res) => {

        this.menuCategoryOptions.set(res.data)
      },
      error: () => this.showError('Menü ürünleri yüklenemedi.')
    });
  }


  loadMenuItems() {
    this.menuItemService.getAllMenuItems().subscribe({
      next: (res) => {
        this.menuItems = res.data || []
      },
      error: () => this.showError('Menü ürünleri yüklenemedi.')
    });
  }


  onRowEditInit(kalem: SiparisKalemiModel) {
    this.clonedRows[kalem.id] = {...kalem};
  }

  onRowEditSave(kalem: SiparisKalemiModel) {
    if (!this.siparisId) {
      this.showError('Sipariş ID bulunamadı.');// geri alma işlemi yapılabilir
      return;
    }
    const updateRequest = {
      siparis: this.siparisId,//kalem.siparisId olacak tüm tablo görülmek istenirse
      id: kalem.id,
      menuItem: kalem.menuItem.id,
      adet: kalem.adet,
      ekOzellikler: kalem.ekOzellikler ?? null,
      kalemNot: kalem.kalemNot ?? null
    };

    this.siparisKalemiService.updateSiparisKalemi(updateRequest).subscribe({
      next: () => {
        this.loadSiparisKalemleri(kalem.siparis);
        delete this.clonedRows[kalem.id];
        this.showSuccess('Sipariş kalemi güncellendi.');
      },
      error: () => {
        this.showError('Sipariş kalemi güncellenemedi.');
        // iptal etmek için eski haline döndür
        const index = this.siparisKalemiData().findIndex(x => x.id === kalem.id);
        if (index !== -1 && this.clonedRows[kalem.id]) {
          this.siparisKalemiData()[index] = this.clonedRows[kalem.id];
          delete this.clonedRows[kalem.id];
        }
      }
    });
  }

  onRowEditCancel(kalem: SiparisKalemiModel, index: number) {
    if (this.clonedRows[kalem.id]) {
      this.siparisKalemiData()[index] = this.clonedRows[kalem.id];
      delete this.clonedRows[kalem.id];
    }
  }

  refresh() {
    this.loadMenuItems();
    this.siparisKalemiService.getAllSiparisKalemleri().subscribe({
      next: (res) =>  this.siparisKalemiData.set(res.data || []),
      error: () => this.showError('Sipariş kalemleri yüklenemedi.')
    });
    this.selectedSiparisKalemiObject = null;
    this.loadAllMasalar()

  }

  showSaveForm() {
    const guncelSiparis = this.siparisKalemiSaveForm.get("siparis")?.value;
    const siparisDegeri = guncelSiparis || this.siparisId;
    this.siparisKalemiSaveForm.reset({
      siparis: siparisDegeri,
      adet: 1
    });
    this.loadMenuItems();
    this.loadMenuCategory();
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.siparisKalemiSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveSiparisKalemi() {
    const guncelSiparis = this.siparisKalemiSaveForm.get("siparis")?.value;

    this.siparisKalemiService.saveSiparisKalemi(this.siparisKalemiSaveForm.value).subscribe({
      next: () => {
        this.loadSiparisKalemleri(guncelSiparis);
        this.showSuccess('Sipariş kalemi kaydedildi.');
        this.closeSaveForm();
      },
      error: () => this.showError('Sipariş kalemi kaydedilemedi.')
    });
  }

  onMenuCategoryChange(event: any) {
    const kategoriId = event.value;
    this.menuItemService.getMenuItemByMenuCategoryId(kategoriId).subscribe({
      next: (res) => {
        this.menuItemByCategoryOption.set(res.data);

      },
      error: () => this.showError('Menü ürünleri yüklenemedi.')
    });
  }

  deleteSiparisKalemiConfirm(kalemId: number) {
    this.siparisKalemiService.deleteSiparisKalemi(kalemId).subscribe({
      next: () => {
        this.showSuccess('Sipariş kalemi silindi.')
        this.loadSiparisKalemleri(this.siparisId)

      },
      error: (err) => {
        this.showSuccess('Sipariş kalemi silinmedi.');
      }
    });

  }

  rowSelect(e: any) {
    this.selectedKalem = e;

    this.siparisKalemiSaveForm.patchValue({
      siparis: e.siparis
    })

  }

  private showError(detail: string) {
    this.messageService.add({severity: 'error', summary: 'Hata', detail});
  }

  private showSuccess(detail: string) {
    this.messageService.add({severity: 'success', summary: 'Başarılı', detail});
  }

  private showWarn(detail: string) {
    this.messageService.add({severity: 'warn', summary: 'Uyarı', detail});
  }
  getSiraliReceteKalemByMasaId(id: any) {


    this.siparisKalemiService.getKalemByMasaId(id).subscribe({
      next: (res) => {
        this.siparisKalemiData.set( [])
        this.siparisKalemiData.set(res.data || [])
      },
      error: (err) => {
        this.showSuccess('Sipariş kalemi  bulunamadı.');
      }

    })
}
  onChangeMasa(e:any) {

    this.getSiraliReceteKalemByMasaId(e.value);

  }
}
