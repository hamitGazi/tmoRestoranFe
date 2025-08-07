import {FormControl, FormGroup, Validators} from '@angular/forms';

export class MasaForm {
  static masaSaveForm(): FormGroup {
    return new FormGroup({
      qrKodUrl: new FormControl('', [Validators.required]),
      kapasite: new FormControl(null, [Validators.required, Validators.min(1)]),
      masaKonum: new FormControl(null, [Validators.required])
    });
  }

  static masaUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl([Validators.required]),
      qrKodUrl: new FormControl('', [Validators.required]),
      kapasite: new FormControl(null, [Validators.required, Validators.min(1)]),
      masaKonum: new FormControl(null, [Validators.required]),
      masaDurum: new FormControl(null, [Validators.required])
    });
  }
}
