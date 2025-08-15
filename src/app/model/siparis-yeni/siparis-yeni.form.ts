import { FormGroup, FormControl, Validators } from '@angular/forms';

export class YeniSiparisForm {
  static siparisSaveForm(): FormGroup {
    return new FormGroup({
      masa: new FormControl(null, [Validators.required]),
      musteriAd: new FormControl('', [Validators.required]),
      personel: new FormControl(null),
      siparisTarihi: new FormControl(new Date(), [Validators.required]),
      siparisNot: new FormControl('')
    });
  }


  static siparisUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null),
      masa: new FormControl(null, [Validators.required]),
      musteriAd: new FormControl('', [Validators.required]),
      personel: new FormControl('', Validators.required),
      siparisDurumu: new FormControl('', Validators.required),
      siparisNot: new FormControl('')
    });
  }

  static tempMenuItemForm(): FormGroup {
    return new FormGroup({
      menuItem: new FormControl(null, [Validators.required]),
      adet: new FormControl(1, [Validators.required, Validators.min(1)]),
      kalemNot: new FormControl(''),
      ekOzellikler: new FormControl('')
    });
  }
}
