import {Component, OnInit, signal} from '@angular/core';
import {OdemeModel} from '../model/odeme/odeme.model';
import {EnumRecord, MasaModel} from '../model/masa/masa.model';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OdemeService} from '../services/odeme/odeme.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {OdemeForm} from '../model/odeme/odeme.form';
import {Toolbar} from 'primeng/toolbar';
import {Button, ButtonDirective} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {Dialog} from 'primeng/dialog';
import {Select} from 'primeng/select';
import {SiparisService} from '../services/siparis/siparis.service';
import {InputText} from 'primeng/inputtext';
import {Tag} from 'primeng/tag';
import {IconField} from 'primeng/iconfield';
import {Tooltip} from 'primeng/tooltip';
import {InputNumber} from 'primeng/inputnumber';
import {DatePicker} from 'primeng/datepicker';


@Component({
  selector: 'app-odeme',
  templateUrl: './odeme.component.html',
  imports: [
    Toolbar,
    Button,
    TableModule,
    ReactiveFormsModule,
    Dialog,
    Select,
    InputText,
    FormsModule,
    Tag,
    IconField,
    ButtonDirective,
    Tooltip,
    InputNumber,
    DatePicker
  ],
  styleUrl: './odeme.component.css'
})
export class OdemeComponent implements OnInit {

  odemeDatas = signal<OdemeModel[]>([]);
  selectedOdemeObject = signal<OdemeModel | null>(null);
  siparisDurOptions = signal<EnumRecord[]>([]);
  odemeYonOptions = signal<EnumRecord[]>([]);
  odemeDurOptions = signal<EnumRecord[]>([]);

  odemeSaveForm!: FormGroup;
  displaySaveForm = signal<boolean>(false);

  odemeUpdateForm!: FormGroup;
  displayUpdateForm = signal<boolean>(false);
  selectedProduct!: MasaModel;

  metaKey: boolean = true;

  constructor(
    private odemeService: OdemeService,
    private siparisService: SiparisService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.odemeSaveForm = OdemeForm.odemeSaveForm();
    this.odemeUpdateForm = OdemeForm.odemeUpdateForm();
  }

  ngOnInit() {
    this.getAllOdemeler();
    this.getSiparisDurOptions();
    this.getOdemeYonOptions();
    this.getOdemeDurOptions();
  }

  getAllOdemeler() {
    this.odemeService.getAllOdemeler().subscribe({
      next: (res) => {
        this.odemeDatas.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödemeler yüklenemedi.'
        });
      }
    });
  }

  getSiparisDurOptions() {
    this.siparisService.getSiparisDurumEnum().subscribe({
      next: (res) => {

        this.siparisDurOptions.set(
          res.data
        );
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Siparişler yüklenemedi.'
        });
      }
    });
  }

  getOdemeYonOptions() {
    this.odemeService.getOdemeYonEnum().subscribe({
      next: (res) => {
        this.odemeYonOptions.set(res.data);
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödeme türleri yüklenemedi.'
        });
      }
    });
  }

  getOdemeDurOptions() {
    this.odemeService.getOdemeDurumEnum().subscribe({
      next: (res) => {
        this.odemeDurOptions.set(res.data
        );
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödeme türleri yüklenemedi.'
        });
      }
    });
  }

  refresh() {
    this.getAllOdemeler();
    this.selectedOdemeObject.set(null);
  }

  showOdemeForm() {
    this.displayUpdateForm.set(false)
    this.odemeSaveForm.reset({})
    this.odemeService.getOdemeById(this.selectedOdemeObject()?.id).subscribe(res => {
      this.odemeSaveForm.patchValue({
        ...res.data,
        odemeZaman: new Date(),
        siparis: res.data?.siparis?.id,

      });
    })
    this.displaySaveForm.set(true);
  }

  closeSaveForm() {
    this.odemeSaveForm.reset();
    this.displaySaveForm.set(false);
  }

  saveOdeme() {
    this.odemeService.saveOdeme(this.odemeSaveForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Ödeme kaydedildi.'
        });
        this.refresh();
        this.closeSaveForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödeme kaydedilemedi.'
        });
      }
    });

  }

  showUpdateForm() {
    this.odemeUpdateForm.reset({});
    this.odemeService.getOdemeById(this.selectedOdemeObject()?.id).subscribe(res => {
      this.displayUpdateForm.set(true);
      this.odemeUpdateForm.patchValue({
        ...res.data,
        siparis: res.data?.siparis?.id

      });
    })
  }

  closeUpdateForm() {
    this.odemeUpdateForm.reset();
    this.displayUpdateForm.set(false);
  }

  updateOdeme() {
    this.odemeService.updateOdeme(this.odemeUpdateForm.value).subscribe({
      next: (res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: 'Ödeme güncellendi.'
        });
        this.refresh();
        this.closeUpdateForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Hata',
          detail: 'Ödeme güncellenemedi.'
        });
      }
    });
  }



}
