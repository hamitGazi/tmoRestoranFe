import {FormControl, FormGroup, Validators} from '@angular/forms';

export class OdemeForm {

  static odemeSaveForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      siparis: new FormControl(null, Validators.required),
      odemeYontem: new FormControl(null, Validators.required),
      toplamTutar: new FormControl(null, [Validators.required, Validators.min(0)]),
      odemeDurum: new FormControl(null, Validators.required),
      odemeZaman: new FormControl(new Date(), Validators.required),
    });
  }

  static odemeUpdateForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(null, Validators.required),
      siparis: new FormControl(null, Validators.required),
      odemeDurum: new FormControl(null, Validators.required),


    });
  }
}
