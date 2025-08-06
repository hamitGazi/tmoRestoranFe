export interface MasaModel {
  id: number;
  qrKodUrl: string;
  kapasite: number;
  masaKonum: string; // Enum: BAHCE, IC_SALON, TERAS
  masaDurum: string; // Enum: AKTIF, REZERVE, KAPALI
  olusturmaTarih: string;
  guncelemeTarih: string;
}

export interface MasaSaveModel {
  qrKodUrl: string;
  kapasite: number;
  masaKonum: string;
}

export interface MasaUpdateModel {
  id: number;
  qrKodUrl: string;
  kapasite: number;
  masaKonum: string;
  masaDurum: string;
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
