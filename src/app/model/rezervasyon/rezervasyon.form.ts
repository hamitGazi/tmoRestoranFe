import {FormControl, FormGroup, Validators} from '@angular/forms';

export class RezervasyonForm {
  static rezervasyonSaveForm(): FormGroup {
    return new FormGroup({
      musteriId: new FormControl(null, [Validators.required]),
      masaId: new FormControl(null, [Validators.required]),
      rezervasyonZamani: new FormControl(null, [Validators.required]),
      kisiSayisi: new FormControl(null, [Validators.required, Validators.min(1)]),
      durum: new FormControl(null, [Validators.required])
    });
  }

  static rezervasyonUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({value: null, disabled: true}, [Validators.required]),
      musteriId: new FormControl(null, [Validators.required]),
      masaId: new FormControl(null, [Validators.required]),
      rezervasyonZamani: new FormControl(null, [Validators.required]),
      kisiSayisi: new FormControl(null, [Validators.required, Validators.min(1)]),
      durum: new FormControl(null, [Validators.required])
    });
  }
}
