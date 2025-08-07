import {FormControl, FormGroup, Validators} from '@angular/forms';

export class KullaniciForm {
  static kullaniciSaveForm(): FormGroup {
    return new FormGroup({
      kullaniciAdi: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      sifre: new FormControl('', [Validators.required, Validators.minLength(6)]),
      rol: new FormControl(null, [Validators.required])
    });
  }

  static kullaniciUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({value: null, disabled: true}, [Validators.required]),
      kullaniciAdi: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      rol: new FormControl(null, [Validators.required])
    });
  }

  static sifreDegistirForm(): FormGroup {
    return new FormGroup({
      yeniSifre: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
}
