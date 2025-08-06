export interface OdemeModel {
  id: number;
  siparisId: number;
  odemeTuru: string; // Enum: NAKIT, KREDI_KARTI, HAVALE
  tutar: number;
  odemeZamani: string;
}

export interface OdemeSaveModel {
  siparisId: number;
  odemeTuru: string;
  tutar: number;
  odemeZamani: string;
}

export interface OdemeUpdateModel {
  id: number;
  siparisId: number;
  odemeTuru: string;
  tutar: number;
  odemeZamani: string;
}

export interface GenericBaseModel<T> {
  success: boolean;
  message: string;
  status: string;
  data: T;
}

export interface EnumRecord {
  name: string;
  label: string;
}

export interface SiparisOption {
  id: number;
  musteriAd: string;
}
