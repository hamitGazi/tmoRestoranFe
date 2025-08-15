import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export class ListReceteForm {
  static receteSaveForm(): FormGroup {
    return new FormGroup({
      menuUrunId: new FormControl(null, [Validators.required]),
      stokKalemiId: new FormControl(null, [Validators.required]),
      miktar: new FormControl(null, [Validators.required, Validators.min(0)]),
      birim: new FormControl(null, [Validators.required]),

    });
  }

  static receteUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, [Validators.required]),
      menuUrunId: new FormControl(null, [Validators.required]),
      stokKalemiId: new FormControl(null, [Validators.required]),
      miktar: new FormControl(null, [Validators.required, Validators.min(0)]),
      birim: new FormControl(null, [Validators.required])
    });
  }
}
