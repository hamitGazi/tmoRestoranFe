import { FormControl, FormGroup, Validators } from '@angular/forms';

export class StokForm {
  static stokSaveForm(): FormGroup {
    return new FormGroup({
      malzemeAdi: new FormControl('', [Validators.required]),
      miktar: new FormControl(null, [Validators.required, Validators.min(0)]),
      birim: new FormControl(null, [Validators.required]),
      menuItem: new FormControl(null)
    });
  }

  static stokUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      malzemeAdi: new FormControl('', [Validators.required]),
      miktar: new FormControl(null, [Validators.required, Validators.min(0)]),
      birim: new FormControl(null, [Validators.required]),
      menuItem: new FormControl(null)
    });
  }
}
