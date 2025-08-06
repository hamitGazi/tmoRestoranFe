import { FormControl, FormGroup, Validators } from '@angular/forms';

export class MenuFiyatForm {
  static menuFiyatSaveForm(): FormGroup {
    return new FormGroup({
      menuItemId: new FormControl(null, [Validators.required]),
      fiyat: new FormControl(null, [Validators.required, Validators.min(0)]),
      indirimFiyati: new FormControl(null),
      gecerlilikBaslangic: new FormControl(null, [Validators.required]),
      gecerlilikBitis: new FormControl(null),
      aktif: new FormControl(true, [Validators.required])
    });
  }

  static menuFiyatUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      fiyat: new FormControl(null, [Validators.required, Validators.min(0)]),
      indirimFiyati: new FormControl(null),
      gecerlilikBaslangic: new FormControl(null, [Validators.required]),
      gecerlilikBitis: new FormControl(null),
      aktif: new FormControl(true, [Validators.required])
    });
  }
}
