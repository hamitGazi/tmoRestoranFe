import {FormControl, FormGroup, Validators} from '@angular/forms';

export class ListSiparisForm {


  static siparisUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl( [Validators.required]),
      masa: new FormControl( [Validators.required]),
      musteriAd: new FormControl('', [Validators.required]),
      personel: new FormControl(null),
      siparisDurumu: new FormControl(null, [Validators.required]),
      siparisNot: new FormControl('')
    });
  }
}
