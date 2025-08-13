export interface SiparisModel {
  id: number;
  masa: MasaOption;
  musteriAd: string;
  toplamTutar: number | null;
  personel: PersonelOption;
  olusturmaZamani: string;
  siparisDurumu: string; // Enum string
  siprisNot: string | null; // Backend JSON'undaki alan adı
}

export interface MasaOption {
  id: number;
  qrKodUrl : string;
}

export interface PersonelOption {
  id: number | null;
  ad: string | null;
}

export interface SiparisSaveModel {
  musteriAd: string;
  masa: number | null;
  personel: number | null;
  siparisDurumu: string;
  siprisNot: string | null;
}

export interface SiparisUpdateModel {
  id: number;
  musteriAd: string;
  masa: number | null;
  personel: number | null;
  siparisDurumu: string;
  siprisNot: string | null;
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
