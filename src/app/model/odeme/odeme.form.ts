import { FormControl, FormGroup, Validators } from '@angular/forms';

export class OdemeForm {
  static odemeSaveForm(): FormGroup {
    return new FormGroup({
      siparisId: new FormControl(null, [Validators.required]),
      odemeTuru: new FormControl(null, [Validators.required]),
      tutar: new FormControl(null, [Validators.required, Validators.min(0)]),
      odemeZamani: new FormControl(null, [Validators.required])
    });
  }

  static odemeUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      siparisId: new FormControl(null, [Validators.required]),
      odemeTuru: new FormControl(null, [Validators.required]),
      tutar: new FormControl(null, [Validators.required, Validators.min(0)]),
      odemeZamani: new FormControl(null, [Validators.required])
    });
  }
}
