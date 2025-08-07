export interface MenuFiyatModel {
  id: number;
  menuItem: GenelProsesModel;
  fiyat: number;
  indirimFiyati: number | null;
  gecerlilikBaslangic: Date;
  gecerlilikBitis: string | null;
  aktif: boolean;
  olusturmaTarih: string;
  guncelleTarih: string;
}

export interface MenuFiyatSaveModel {
  menuItem: number;
  fiyat: number;
  indirimFiyati: number | null;
  gecerlilikBaslangic: string;
  gecerlilikBitis: string | null;
  aktif: boolean;
}
export interface GenelProsesModel{
  id: number;
  ad: string;
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
