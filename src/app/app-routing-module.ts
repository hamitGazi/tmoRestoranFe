/*
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuCategoryComponent} from './menu-category/menu-category.component';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {MenuFiyatComponent} from './menu-fiyat/menu-fiyat.component';
import {SiparisComponent} from './siparis/siparis.component';
import {SiparisKalemiComponent} from './siparis-kalem/siparis-kalem.component';
import {MusteriComponent} from './musteri/musteri.component';
import {MusteriBildirimComponent} from './musteri-bildirim/musteri-bildirim.component';
import {OdemeComponent} from './odeme/odeme.component';
import {PersonelComponent} from './personel/personel.component';
import {StokComponent} from './stok/stok.component';
import {RaporComponent} from './rapor/rapor.component';
import {RezervasyonComponent} from './rezervasyon/rezervasyon.component';
import {KullaniciComponent} from './kullanici/kullanici.component';
import {MasaComponent} from './masa/masa.component';
import {DashboardComponent} from './dashbord/dashbord.component';





const routes: Routes = [
   { path: '', component: DashboardComponent },
   { path: 'home', component: DashboardComponent },
  { path: 'masalar', component: MasaComponent },
  { path: 'menu-category', component: MenuCategoryComponent },
  { path: 'menu-item', component: MenuItemComponent },
  { path: 'menu-fiyat', component: MenuFiyatComponent },
  /* { path: 'siparis/yeni', component: SiparisYeniComponent },*/
  { path: 'siparis', component: SiparisComponent },
  { path: 'siparis-kalemi', component: SiparisKalemiComponent },
  { path: 'musteri', component: MusteriComponent },
  { path: 'musteri-bildirim', component: MusteriBildirimComponent },
  { path: 'odeme', component: OdemeComponent },
  { path: 'personel', component: PersonelComponent },
  { path: 'stok', component: StokComponent },
  { path: 'rapor', component: RaporComponent },
  { path: 'rezervasyon', component: RezervasyonComponent },
  { path: 'kullanici', component: KullaniciComponent },

  /*  // Diğer tüm bilinmeyen rotalar için
    { path: '**', redirectTo: 'home', pathMatch: 'full' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
