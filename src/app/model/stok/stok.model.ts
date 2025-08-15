export interface StokModel {
  id: number;
  malzemeAd: string;
  miktar: number;
  kritikMiktar: number;
  birim: string; // Enum: KG, LT, ADET
  menuItem: number | null;
  aciklama: string;
  olusturmaTarih: string;
}

export interface StokSaveModel {
  malzemeAdi: string;
  miktar: number;
  kritikMiktar: number;
  birim: string;
  menuItem: number | null;
  aciklama: string;
}

export interface StokUpdateModel {
  id: number;
  malzemeAdi: string;
  miktar: number;
  kritikMiktar: number;
  birim: string;
  menuItem: number | null;
  aciklama: string;
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
export interface MenuCategoryOption {
  id: number;
  ad: string;
}
