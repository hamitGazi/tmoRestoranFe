import { FormControl, FormGroup } from '@angular/forms';

export class RaporForm {
  static raporFilterForm(): FormGroup {
    return new FormGroup({
      tarihBaslangic: new FormControl(null),
      tarihBitis: new FormControl(null),
      odemeTuru: new FormControl(null)
    });
  }
}
