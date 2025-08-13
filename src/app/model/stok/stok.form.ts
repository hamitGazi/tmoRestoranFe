import {FormControl, FormGroup, Validators} from '@angular/forms';

export class StokForm {
  static stokSaveForm(): FormGroup {
    return new FormGroup({
      malzemeAd: new FormControl('', [Validators.required]),
      menuItem: new FormControl(null),
      birim: new FormControl(null, [Validators.required]),
      miktar: new FormControl(null, [Validators.required, Validators.min(0)]),

    });
  }

  static stokUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({value: null, disabled: true}, [Validators.required]),
      malzemeAd: new FormControl('', [Validators.required]),
      miktar: new FormControl(null, [Validators.required, Validators.min(0)]),
      birim: new FormControl(null, [Validators.required]),
      menuItem: new FormControl(null)
    });
  }
}
