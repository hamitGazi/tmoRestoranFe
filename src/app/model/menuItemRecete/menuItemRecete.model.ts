



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

export interface ReceteModel {
  id: number;
  menuItemId: MenuItemOption;       // API 'menuItem' diyor, seninki menuUrunId idi
  stokKalemId: StokKalemiOption;     // API birebir böyle dönüyor
  miktar: number;
  birim: string;                   // API'de direkt string ("ADET")
  olusturmaTarih: string | null;   // API'de tarih string olarak geliyor
  guncelleTarih: string | null;
}

export interface MenuItemOption {
  id: number;
  ad: string;
}

export interface StokKalemiOption {
  id: number;
  ad: string;
  miktar: number; // Mevcut stok miktarı
  birim: string;  // Enum string ("KG" vb.)
}

export interface ReceteSaveModel {
  menuItemId: number;  // API kaydetmede id istiyor
  stokKalemId: number;
  miktar: number;
  birim: string;
}

export interface ReceteUpdateModel {
  id: number;
  menuItemId: number;
  stokKalemId: number;
  miktar: number;
  birim: string;
}

