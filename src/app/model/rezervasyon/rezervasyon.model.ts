export interface RezervasyonModel {
  id: number;
  musteriId: number;
  masaId: number;
  rezervasyonZamani: string;
  kisiSayisi: number;
  durum: string; // Enum: ONAYLANDI, IPTAL, BEKLEMEDE
  olusturmaTarih: string;
}

export interface RezervasyonSaveModel {
  musteriId: number;
  masaId: number;
  rezervasyonZamani: string;
  kisiSayisi: number;
  durum: string;
}

export interface RezervasyonUpdateModel {
  id: number;
  musteriId: number;
  masaId: number;
  rezervasyonZamani: string;
  kisiSayisi: number;
  durum: string;
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

export interface MusteriOption {
  id: number;
  ad: string;
}

export interface MasaOption {
  id: number;
  qrKodUrl: string;
}
