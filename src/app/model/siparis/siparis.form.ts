
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class SiparisForm {
  static siparisSaveForm(): FormGroup {
    return new FormGroup({
      masaId: new FormControl(null, [Validators.required]),
      musteriAd: new FormControl('', [Validators.required]),
      personelId: new FormControl(null, [Validators.required]),
      not: new FormControl('')
    });
  }

  static siparisUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      musteriAd: new FormControl('', [Validators.required]),
      personelId: new FormControl(null, [Validators.required]),
      siparisDurumu: new FormControl(null, [Validators.required]),
      not: new FormControl('')
    });
  }
}
