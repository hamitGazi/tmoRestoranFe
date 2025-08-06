export interface MenuFiyatModel {
  id: number;
  menuItemId: number;
  fiyat: number;
  indirimFiyati: number | null;
  gecerlilikBaslangic: string;
  gecerlilikBitis: string | null;
  aktif: boolean;
  olusturmaTarih: string;
  guncelleTarih: string;
}

export interface MenuFiyatSaveModel {
  menuItemId: number;
  fiyat: number;
  indirimFiyati: number | null;
  gecerlilikBaslangic: string;
  gecerlilikBitis: string | null;
  aktif: boolean;
}

export interface MenuFiyatUpdateModel {
  id: number;
  fiyat: number;
  indirimFiyati: number | null;
  gecerlilikBaslangic: string;
  gecerlilikBitis: string | null;
  aktif: boolean;
}

export interface GenericBaseModel<T> {
  success: boolean;
  message: string;
  status: string;
  data: T;
}

export interface MenuItemOption {
  id: number;
  ad: string;
}
