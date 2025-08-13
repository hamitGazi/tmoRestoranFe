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
import { Gokhan } from './gokhan/gokhan';


@NgModule({
  declarations: [
    App,
    Gokhan,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MenubarComponent,
    FormsModule,
    ReactiveFormsModule,
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

  bootstrap: [App]
})
export class AppModule {
}
