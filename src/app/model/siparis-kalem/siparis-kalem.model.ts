export interface SiparisKalemiModel {
  id: number;
  siparis: number;
  menuItem: number;
  adet: number;
  birimFiyat: number;
  not: string | null;
}

export interface SiparisKalemiSaveModel {
  siparis: number;
  menuItem: number;
  adet: number;
  birimFiyat: number;
  not: string | null;
}

export interface SiparisKalemiUpdateModel {
  id: number;
  menuItem: number;
  adet: number;
  birimFiyat: number;
  not: string | null;
}

export interface GenericBaseModel<T> {
  success: boolean;
  message: string;
  status: string;
  data: T;
}

export interface SiparisOption {
  id: number;
  musteriAd: string;
}

export interface MenuItemOption {
  id: number;
  ad: string;
}
