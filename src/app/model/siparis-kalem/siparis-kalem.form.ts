import {FormControl, FormGroup, Validators} from '@angular/forms';

export class SiparisKalemiForm {
  static siparisKalemiSaveForm(): FormGroup {
    return new FormGroup({
      siparis: new FormControl(null, [Validators.required]),
      menuItem: new FormControl(null, [Validators.required]),
      adet: new FormControl(1, [Validators.required, Validators.min(1)]),
      birimFiyat: new FormControl(null, [Validators.required, Validators.min(0)]),
      not: new FormControl('')
    });
  }

  static siparisKalemiUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({value: null, disabled: true}, [Validators.required]),
      menuItem: new FormControl(null, [Validators.required]),
      adet: new FormControl(null, [Validators.required, Validators.min(1)]),
      birimFiyat: new FormControl(null, [Validators.required, Validators.min(0)]),
      not: new FormControl('')
    });
  }
}
