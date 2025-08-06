export interface MusteriBildirimModel {
  id: number;
  musteriId: number;
  bildirimTuru: string; // Enum: SIPARIS_BILDIRIMI, PROMOSYON, DIGER
  mesaj: string;
  bildirimZamani: string;
}

export interface MusteriBildirimSaveModel {
  musteriId: number;
  bildirimTuru: string;
  mesaj: string;
  bildirimZamani: string;
}

export interface MusteriBildirimUpdateModel {
  id: number;
  musteriId: number;
  bildirimTuru: string;
  mesaj: string;
  bildirimZamani: string;
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
