export interface MenuItemModel {
  id: number;
  ad: string;
  aciklama: string;
  kategori: number; // MenuCategoryEntity ID
  aktif: boolean;
  resimYolu: string;
  ekOzellikler: string;
  olusturmaTarih: string;
  guncelemeTarih: string;
}

export interface MenuItemSaveModel {
  ad: string;
  aciklama: string;
  kategoriId: number;
  aktif: boolean;
  resimYolu: string;
  ekOzellikler: string;
}

export interface MenuItemUpdateModel {
  id: number;
  ad: string;
  aciklama: string;
  kategoriId: number;
  aktif: boolean;
  resimYolu: string;
  ekOzellikler: string;
}

export interface GenericBaseModel<T> {
  success: boolean;
  message: string;
  status: string;
  data: T;
}

export interface MenuCategoryOption {
  id: number;
  ad: string;
}
