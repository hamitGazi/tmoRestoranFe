export interface MusteriBildirimModel {
  id: number;
  musteriAd: string;
  geriBildirimTur: string; // Enum: SIPARIS_BILDIRIMI, PROMOSYON, DIGER
  mesaj: string;
  bildirimZamani: string;
}

export interface MusteriBildirimSaveModel {
  musteriAd: string;
  geriBildirimTur: string;
  puan: number;
  yorum: string;
  siparis: string;
}

export interface MusteriBildirimUpdateModel {
  id: number;
  musteriAd: string;
  geriBildirimTur: string;
  puan: number;
  yorum: string;
  siparis: string
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

export interface ProjeIdAdModel {
  id: number;
  ad: string;
}

