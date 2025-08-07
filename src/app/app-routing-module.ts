import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashbord/dashbord.component';
import {MasaComponent} from './masa/masa.component';
import {MenuCategoryComponent} from './menu-category/menu-category.component';
import {MenuItemComponent} from './menu-item/menu-item.component';
import {MenuFiyatComponent} from './menu-fiyat/menu-fiyat.component';
import {SiparisComponent} from './siparis/siparis.component';

import {MusteriComponent} from './musteri/musteri.component';
import {MusteriBildirimComponent} from './musteri-bildirim/musteri-bildirim.component';
import {OdemeComponent} from './odeme/odeme.component';
import {PersonelComponent} from './personel/personel.component';
import {StokComponent} from './stok/stok.component';
import {RaporComponent} from './rapor/rapor.component';
import {RezervasyonComponent} from './rezervasyon/rezervasyon.component';
import {KullaniciComponent} from './kullanici/kullanici.component';
import {SiparisKalemiComponent} from './siparis-kalem/siparis-kalem.component';


const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'home', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'masalar', component: MasaComponent},
  {path: 'menu-category', component: MenuCategoryComponent},
  {path: 'menu-item', component: MenuItemComponent},
  {path: 'menu-fiyat', component: MenuFiyatComponent},
  {path: 'siparis', component: SiparisComponent},
  {path: 'siparis-kalemi', component: SiparisKalemiComponent},
  {path: 'musteri', component: MusteriComponent},
  {path: 'musteri-bildirim', component: MusteriBildirimComponent},
  {path: 'odeme', component: OdemeComponent},
  {path: 'personel', component: PersonelComponent},
  {path: 'stok', component: StokComponent},
  {path: 'rapor', component: RaporComponent},
  {path: 'rezervasyon', component: RezervasyonComponent},
  {path: 'kullanici', component: KullaniciComponent},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
