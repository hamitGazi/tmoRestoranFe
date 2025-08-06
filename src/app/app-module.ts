import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {MenubarComponent} from "./menubar/menubar.component";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

@NgModule({
  declarations: [
    App
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MenubarComponent
    ],
  providers: [
    provideBrowserGlobalErrorListeners(), provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })

  ],
  bootstrap: [App]
})
export class AppModule { }
