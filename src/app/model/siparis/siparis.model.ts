export interface SiparisModel {
  id: number;
  masaId: number;
  musteriAd: string;
  toplamTutar: number;
  personelId: number;
  olusturmaZamani: string;
  siparisDurumu: string; // Enum: BEKLIYOR, HAZIRLANIYOR, SERVIS_EDILDI, IPTAL_EDILDI, TAMAMLANDI
  not: string | null;
}

export interface SiparisSaveModel {
  masaId: number;
  musteriAd: string;
  personelId: number;
  not: string | null;
}

export interface SiparisUpdateModel {
  id: number;
  musteriAd: string;
  personelId: number;
  siparisDurumu: string;
  not: string | null;
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

export interface MasaOption {
  id: number;
  qrKodUrl: string;
}

export interface PersonelOption {
  id: number;
  ad: string;
}
