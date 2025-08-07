export interface StokModel {
  id: number;
  malzemeAdi: string;
  miktar: number;
  birim: string; // Enum: KG, LT, ADET
  menuItem: number | null;
  olusturmaTarih: string;
}

export interface StokSaveModel {
  malzemeAdi: string;
  miktar: number;
  birim: string;
  menuItem: number | null;
}

export interface StokUpdateModel {
  id: number;
  malzemeAdi: string;
  miktar: number;
  birim: string;
  menuItem: number | null;
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

export interface MenuItemOption {
  id: number;
  ad: string;
}
