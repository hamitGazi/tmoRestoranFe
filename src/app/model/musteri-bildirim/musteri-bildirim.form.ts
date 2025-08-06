import { FormControl, FormGroup, Validators } from '@angular/forms';

export class MusteriBildirimForm {
  static musteriBildirimSaveForm(): FormGroup {
    return new FormGroup({
      musteriId: new FormControl(null, [Validators.required]),
      bildirimTuru: new FormControl(null, [Validators.required]),
      mesaj: new FormControl('', [Validators.required]),
      bildirimZamani: new FormControl(null, [Validators.required])
    });
  }

  static musteriBildirimUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      musteriId: new FormControl(null, [Validators.required]),
      bildirimTuru: new FormControl(null, [Validators.required]),
      mesaj: new FormControl('', [Validators.required]),
      bildirimZamani: new FormControl(null, [Validators.required])
    });
  }
}
