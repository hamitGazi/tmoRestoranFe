import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RaporForm {
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  static satisRaporForm(): FormGroup {
    return new FormGroup({
      gecerlilikBaslangic: new FormControl(null),
      gecerlilikBitis: new FormControl(null),
      odemeTuru: new FormControl(null)
    });
  }

  static stokRaporForm(): FormGroup {
    return new FormGroup({
      gecerlilikBaslangic: new FormControl(null),
      gecerlilikBitis: new FormControl(null),
      islemTipi: new FormControl(null)
    });
  }

  static geriBildirimRaporForm(): FormGroup {
    return new FormGroup({
      gecerlilikBaslangic: new FormControl(null),
      gecerlilikBitis: new FormControl(null),
      geriBildirimTuru: new FormControl(null)
    });
  }

  static personelRaporForm(): FormGroup {
    return new FormGroup({
      gecerlilikBaslangic: new FormControl(null),
      gecerlilikBitis: new FormControl(null),
      rol: new FormControl(null)
    });
  }

  static masaKullanimRaporForm(): FormGroup {
    return new FormGroup({
      gecerlilikBaslangic: new FormControl(null),
      gecerlilikBitis: new FormControl(null),
      masaKonum: new FormControl(null)
    });
  }

  createFilterForm(defaultControls: { [key: string]: any } = {}): FormGroup {
    return this.fb.group({
      gecerlilikBaslangic: [null],
      gecerlilikBitis: [null],
      ...defaultControls
    });
  }

  validateFilterForm(form: FormGroup): boolean {
    if (!form.value.gecerlilikBaslangic || !form.value.gecerlilikBitis) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Uyarı',
        detail: 'Lütfen başlangıç ve bitiş tarihlerini seçin.'
      });
      return false;
    }
    return true;
  }

  resetFilterForm(form: FormGroup) {
    form.reset();
  }
}
