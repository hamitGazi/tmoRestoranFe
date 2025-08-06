export interface PersonelModel {
  id: number;
  ad: string;
  soyad: string;
  telefon: string;
  email: string | null;
  rol: string; // Enum: GARSON, MUTFAK, YONETICI
  olusturmaTarih: string;
  guncelleTarih: string;
}

export interface PersonelSaveModel {
  ad: string;
  soyad: string;
  telefon: string;
  email: string | null;
  rol: string;
}

export interface PersonelUpdateModel {
  id: number;
  ad: string;
  soyad: string;
  telefon: string;
  email: string | null;
  rol: string;
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
