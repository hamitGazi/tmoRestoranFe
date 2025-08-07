import { FormControl, FormGroup, Validators } from '@angular/forms';

export class MusteriForm {
  static musteriSaveForm(): FormGroup {
    return new FormGroup({
      ad: new FormControl('', [Validators.required]),
      soyad: new FormControl('', [Validators.required]),
      telefon: new FormControl(''),
      email: new FormControl(''),
      adres: new FormControl('')
    });
  }

  static musteriUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl( [Validators.required]),
      ad: new FormControl('', [Validators.required]),
      soyad: new FormControl('', [Validators.required]),
      telefon: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email: new FormControl('', [Validators.email]),
      adres: new FormControl('')
    });
  }
}
