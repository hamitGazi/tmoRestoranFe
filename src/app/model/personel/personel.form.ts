import { FormControl, FormGroup, Validators } from '@angular/forms';

export class PersonelForm {
  static personelSaveForm(): FormGroup {
    return new FormGroup({
      ad: new FormControl('', [Validators.required]),
      soyad: new FormControl('', [Validators.required]),
      telefon: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email: new FormControl('', [Validators.email]),
      rol: new FormControl(null, [Validators.required])
    });
  }

  static personelUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      ad: new FormControl('', [Validators.required]),
      soyad: new FormControl('', [Validators.required]),
      telefon: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      email: new FormControl('', [Validators.email]),
      rol: new FormControl(null, [Validators.required])
    });
  }
}
