import {SiparisKalemiSaveModel} from '../siparis-kalem/siparis-kalem.model';

export interface SiparisModel {
  id: number;
  masaId: number;
  musteriAd: string;
  siparisTarihi: Date;
  menuItems: { menuItemId: number; adet: number; not: string | null }[];
}

export interface SiparisSaveModel {
  masaId: number;
  musteriAd: string;
  personelId?: number | null;
  siparisNot?: string | null;
  menuItems: SiparisKalemiSaveModel[];
  siparisTarihi?: Date;
}

export interface SiparisUpdateModel {
  id: number;
  masaId: number;
  musteriAd: string;
  siparisTarihi: Date;
  menuItems: { menuItemId: number; adet: number; not: string | null }[];
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

export interface MasaOption {
  id: number;
  qrKodUrl: string;
}
