import {FormControl, FormGroup, Validators} from '@angular/forms';

export class MenuCategoryForm {
  static menuCategorySaveForm(): FormGroup {
    return new FormGroup({
      ad: new FormControl('', [Validators.required]),
      aciklama: new FormControl(''),
      menuSira: new FormControl(null, [Validators.required, Validators.min(1)]),
      aktif: new FormControl(true, [Validators.required])
    });
  }

  static menuCategoryUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl({ value: null, disabled: true }, [Validators.required]),
      ad: new FormControl('', [Validators.required]),
      aciklama: new FormControl(''),
      menuSira: new FormControl(null, [Validators.required, Validators.min(1)]),
      aktif: new FormControl(true, [Validators.required])
    });
  }
}
