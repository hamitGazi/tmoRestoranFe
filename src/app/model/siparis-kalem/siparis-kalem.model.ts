export interface SiparisKalemiModel {
  id: number;
  siparis?: number;
  masa?: MasaOption;
  menuItem: MenuItemOption;
  adet: number;
  birimFiyat: number;
  toplamFiyat: number;
  kalemNot: string | null;
  siparisDurumu:string;
  ekOzellikler: String
}

export interface SiparisKalemiSaveModel {
  siparis?: number;
  menuItem: number;
  adet: number;
  birimFiyat: number;
  kalemNot: string | null;
  ekOzellikler: String
}

export interface SiparisKalemiUpdateModel {
  siparisId: number;
  menuItems: {
    id?: number;
    menuItem: number;
    adet: number;
    ekOzellikler?: string | null;
    kalemNot?: string | null;
  }[];
}
////////////////////////////////
export interface SiparisKalemiGuncellemeFormModel {
  id?: number; // varsa düzenleme, yoksa yeni
  menuItem: number;
  adet: number;
  kalemNot?: string | null;
  ekOzellikler?: string | null;
}

export interface SiparisKalemUpdateModel {
  siparisId: number;
  menuItems: SiparisKalemiGuncellemeFormModel[];
}



////////////////////////////////////////////
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
export interface MasaOption {
  id: number;
  qrKodUrl: string;
}

export interface MenuItemOption {
  id: number;
  ad: string;
  kategori: {
    id: number;
    ad: string;
  };
}
