import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export class SiparisKalemiForm {
  static siparisKalemiSaveForm(): FormGroup {
    return new FormGroup({
      siparis: new FormControl(null, [Validators.required]),
      menuItem: new FormControl(null, [Validators.required]),
      adet: new FormControl(1, [Validators.required, Validators.min(1)]),
      kalemNot: new FormControl(''),
      ekOzellikler: new FormControl(''),
    });
  }

  /* static siparisKalemiUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl([Validators.required]),
      menuItem: new FormControl(null, [Validators.required]),
      adet: new FormControl(null, [Validators.required, Validators.min(1)]),
      birimFiyat: new FormControl(null, [Validators.required, Validators.min(0)]),
      kalemNot: new FormControl(''),
      ekOzellikler: new FormControl(''),
    });
  } */
  static siparisKalemiUpdateForm(): FormGroup {
    return new FormGroup({
      kalemler: new FormArray([])
    });
  }

  // Yardımcı metod: Her kalem için form grubu oluşturur
  static createKalemFormGroup(kalem?: any): FormGroup {
    return new FormGroup({
      id: new FormControl(kalem ? kalem.id : null),
      menuItem: new FormControl(kalem ? kalem.menuItem : null, [Validators.required]),
      adet: new FormControl(kalem ? kalem.adet : null, [Validators.required, Validators.min(1)]),
      birimFiyat: new FormControl(kalem ? kalem.birimFiyat : null, [Validators.required, Validators.min(0)]),
      kalemNot: new FormControl(kalem ? kalem.kalemNot : ''),
      ekOzellikler: new FormControl(kalem ? kalem.ekOzellikler : ''),
    });
  }
}
