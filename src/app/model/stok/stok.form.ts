import {FormControl, FormGroup, Validators} from '@angular/forms';

export class StokForm {
  static stokSaveForm(): FormGroup {
    return new FormGroup({
      ad: new FormControl('', [Validators.required]),
      birim: new FormControl(null, [Validators.required]),
      miktar: new FormControl(null, [Validators.required, Validators.min(0)]),
      aktif: new FormControl(null, [Validators.required]),

    });
  }

  static stokUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({value: null, disabled: true}, [Validators.required]),
      ad: new FormControl('', [Validators.required]),
      miktar: new FormControl(null, [Validators.required, Validators.min(0)]),
      birim: new FormControl(null, [Validators.required]),
      aktif: new FormControl(null, [Validators.required]),
    });
  }
}
