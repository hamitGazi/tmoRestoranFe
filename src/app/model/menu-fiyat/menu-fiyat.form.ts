import { FormControl, FormGroup, Validators } from '@angular/forms';

export class MenuFiyatForm {
  static menuFiyatSaveForm(): FormGroup {
    return new FormGroup({
      menuItem: new FormControl(null, [Validators.required]),
      fiyat: new FormControl(null, [ Validators.min(0)]),
      indirimFiyati: new FormControl(null),
      gecerlilikBaslangic: new FormControl(null, [Validators.required]),
      gecerlilikBitis: new FormControl(null),
      aktif: new FormControl(true)
    });
  }

  static menuFiyatUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, [Validators.required]),
       menuItem: new FormControl(null, [Validators.required]),
      fiyat: new FormControl(null, [Validators.min(0)]),
      indirimFiyati: new FormControl(null),
      gecerlilikBaslangic: new FormControl([Validators.required]),
      gecerlilikBitis: new FormControl(null),
      aktif: new FormControl(true)
    });
  }
}
