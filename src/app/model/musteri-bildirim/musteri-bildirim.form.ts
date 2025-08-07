import {FormControl, FormGroup, Validators} from '@angular/forms';

export class MusteriBildirimForm {
  static musteriBildirimSaveForm(): FormGroup {
    return new FormGroup({
      musteriAd: new FormControl(null, [Validators.required]),
      geriBildirimTur: new FormControl(null, [Validators.required]),
      puan: new FormControl(null, [Validators.required]),
      yorum: new FormControl(null),
      siparis: new FormControl(null),


    });
  }

  static musteriBildirimUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl([Validators.required]),
      musteriAd: new FormControl(null, [Validators.required]),
      geriBildirimTur: new FormControl(null, [Validators.required]),
      puan: new FormControl(null, [Validators.required]),
      yorum: new FormControl(null),
      siparis: new FormControl(null),

    });
  }
}
