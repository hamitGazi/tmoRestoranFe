export interface MusteriModel {
  id: number;
  ad: string;
  soyad: string;
  telefon: string;
  email: string | null;
  adres: string | null;
  olusturmaTarih: string;
  guncelleTarih: string;
}

export interface MusteriSaveModel {
  ad: string;
  soyad: string;
  telefon: string;
  email: string | null;
  adres: string | null;
}

export interface MusteriUpdateModel {
  id: number;
  ad: string;
  soyad: string;
  telefon: string;
  email: string | null;
  adres: string | null;
}

export interface GenericBaseModel<T> {
  success: boolean;
  message: string;
  status: string;
  data: T;
}
