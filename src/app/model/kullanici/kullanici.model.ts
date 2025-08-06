export interface KullaniciModel {
  id: number;
  kullaniciAdi: string;
  email: string;
  rol: string; // Enum: YONETICI, GARSON, MUTFAK, KASA
  olusturmaTarih: string;
}

export interface KullaniciSaveModel {
  kullaniciAdi: string;
  email: string;
  sifre: string;
  rol: string;
}

export interface KullaniciUpdateModel {
  id: number;
  kullaniciAdi: string;
  email: string;
  rol: string;
}

export interface KullaniciSifreDegistirModel {
  id: number;
  yeniSifre: string;
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
