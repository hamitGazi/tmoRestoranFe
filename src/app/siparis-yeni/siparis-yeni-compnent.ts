
import {Component, OnInit, signal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MasaOption} from '../model/siparis/siparis.model';
import {MenuItemOption} from '../model/stok/stok.model';
import {MasaService} from '../services/masa/masa.service';
import {MenuItemService} from '../services/menu-item/menu-item.service';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {InputNumber} from 'primeng/inputnumber';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {MenuItemModel} from '../model/menu-item/menu-item.model';
import {InputText} from 'primeng/inputtext';
import {ActivatedRoute} from '@angular/router';
import {YeniSiparisForm} from '../model/siparis-yeni/siparis-yeni.form';
import {YeniSiparisService} from '../services/siparis-yeni/siparis-yeni.service';
import {Toolbar} from 'primeng/toolbar';
import {PersonelModel} from '../model/personel/personel.model';
import {PersonelService} from '../services/personel/personel.service';
import {SiparisKalemiSaveModel} from '../model/siparis-kalem/siparis-kalem.model';

@Component({
  selector: 'app-siparis-yeni',
  templateUrl: './siparis-yeni-compnent.html',
  styleUrl: './siparis-yeni-compnent.css',
  imports: [
    Button,
    ReactiveFormsModule,
    InputNumber,
    Dialog,
    Select,
    InputText,
    Toolbar
  ]
})
export class SiparisYeniComponent implements OnInit {
  siparisSaveForm: FormGroup = YeniSiparisForm.siparisSaveForm();
  tempMenuItemForm: FormGroup = YeniSiparisForm.tempMenuItemForm();

  displaySaveForm = signal<boolean>(false);
  masaOptions = signal<MasaOption[]>([]);
  menuItemOptions = signal<MenuItemOption[]>([]);
  menuItems = signal<MenuItemModel[]>([]);
  personelOptions = signal<PersonelModel[]>([]);
  personelListAktif = signal<boolean>(false);
  siparisKalemleri = signal<SiparisKalemiSaveModel[]>([]);
  constructor(
    private route: ActivatedRoute,
    private yeniSiparisService: YeniSiparisService,
    private masaService: MasaService,
    private personelService: PersonelService,
    private menuItemService: MenuItemService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.getMasaOptions();
    this.getMenuItemOptions();
    this.checkQrKod(); // 👈 QR kod kontrolü
      this.getPersoneOptions();


  }

  checkQrKod() {
    const qrKod = this.route.snapshot.paramMap.get('qrKod');
    if (qrKod) {
      this.masaService.getMasaByQr(qrKod).subscribe({
        next: (masa) => {
          this.siparisSaveForm.patchValue({
            /*  masaId: masa?.id,*/
            siparisTarihi: new Date()
          });
          this.displaySaveForm.set(true);
        },
        error: () => this.showError('QR koddan masa bilgisi alınamadı.')
      });
    }
  }

  getMasaOptions() {
    this.masaService.getAllMasalar().subscribe({
      next: (res) => this.masaOptions.set(res.data),
      error: () => this.showError('Masalar yüklenemedi.')
    });
  }
  getPersoneOptions() {
    this.personelService.getAllPersoneller().subscribe({
      next: (res) => this.personelOptions.set(res.data),
      error: () => this.showError('Person Listesi yüklenemedi.')
    });
  }


  getMenuItemOptions() {
    this.menuItemService.getAllMenuItems().subscribe({
      next: (res) => {
        this.menuItemOptions.set(res.data);
      },
      error: () => this.showError('Menü öğeleri yüklenemedi.')
    });
  }

  getMenuItemAdById(id: number): string {
    const found = this.menuItemOptions().find(m => m.id === id);
    return found ? found.ad : '';
  }

  addMenuItem() {
    if (this.tempMenuItemForm.value) {
      this.siparisKalemleri.update(items => [...items, this.tempMenuItemForm.value
      ]);
      this.tempMenuItemForm.reset({adet: 1});
    } else {
      this.showError('Lütfen menü ürünü ve adeti seçin.');
    }
  }

  removeMenuItem(index: number) {
    this.siparisKalemleri.update(items => items.filter((_, i) => i !== index));
  }

  showSaveForm() {
    this.personelListAktif.set(true);
    this.siparisSaveForm.reset({siparisTarihi: new Date()});
    this.menuItems.set([]);
    this.tempMenuItemForm.reset({adet: 1});
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.siparisSaveForm.reset();
    this.menuItems.set([]);
    this.tempMenuItemForm.reset({adet: 1});
    this.personelListAktif.set(false);
    this.displaySaveForm.set(false);

  }


  saveSiparis() {

    const saveData = {
      ...this.siparisSaveForm.value, // formdaki tüm alanlar buraya dahil edilir
      menuItems: this.siparisKalemleri()


    }

    console.log("save",saveData);
      this.yeniSiparisService.saveSiparis(saveData).subscribe({
        next: () => {
          this.showSuccess('Sipariş kaydedildi.');
          this.closeSaveForm();
        },
        error: () => this.showError('Sipariş kaydedilemedi.')
      });

  }

  private showError(detail: string) {
    this.messageService.add({severity: 'error', summary: 'Hata', detail});
  }

  private showSuccess(detail: string) {
    this.messageService.add({severity: 'success', summary: 'Başarılı', detail});
  }

  refresh() {
    this.personelListAktif.set(false);

  }
}
