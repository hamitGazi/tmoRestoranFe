import {NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing-module';
import {App} from './app';
import {MenubarComponent} from "./menubar/menubar.component";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SatisRaporComponent} from './satis-rapor/satis-rapor-component';
import {StokRaporComponent} from './stok-rapor/stok-rapor-component';
import {GeriBildirimRaporComponent} from './geri-bildirim-rapor/geri-bildirim-rapor-component';
import {PersonelRaporComponent} from './personel-rapor/personel-rapor-component';
import {MasaKullanimRaporComponent} from './masa-kullanim-rapor/masa-kullanim-rapor-component';
import {Button} from 'primeng/button';
import {UIChart} from 'primeng/chart';
import {Toast} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {Toolbar} from 'primeng/toolbar';
import {DatePicker} from 'primeng/datepicker';
import {Select} from 'primeng/select';








@NgModule({
  declarations: [
    App,
    SatisRaporComponent,
    StokRaporComponent,
    GeriBildirimRaporComponent,
    PersonelRaporComponent,
    MasaKullanimRaporComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MenubarComponent,
    FormsModule,
    ReactiveFormsModule,
    Button,
    UIChart,
    Toast,
    TableModule,
    Toolbar,
    DatePicker,
    Select,
  ],
  providers: [

    provideHttpClient(withInterceptorsFromDi())
    , ConfirmationService,
    MessageService,
    provideBrowserGlobalErrorListeners(), provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ],
  exports: [
    SatisRaporComponent,
    StokRaporComponent,
    GeriBildirimRaporComponent,
    PersonelRaporComponent,
    MasaKullanimRaporComponent
  ],

  bootstrap: [App]
})
export class AppModule {
}
