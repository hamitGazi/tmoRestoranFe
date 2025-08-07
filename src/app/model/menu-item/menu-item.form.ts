import {FormControl, FormGroup, Validators} from '@angular/forms';

export class MenuItemForm {
  static menuItemSaveForm(): FormGroup {
    return new FormGroup({
      ad: new FormControl('', [Validators.required]),
      aciklama: new FormControl(''),
      kategoriId: new FormControl(null, [Validators.required]),
      aktif: new FormControl(true),
      resimYolu: new FormControl(''),
      ekOzellikler: new FormControl('')
    });
  }

  static menuItemUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl([Validators.required]),
      ad: new FormControl('', [Validators.required]),
      aciklama: new FormControl(''),
      kategoriId: new FormControl(null, [Validators.required]),
      aktif: new FormControl(true),
      resimYolu: new FormControl(''),
      ekOzellikler: new FormControl('')
    });
  }
}
