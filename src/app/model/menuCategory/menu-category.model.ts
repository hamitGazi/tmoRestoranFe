export interface MenuCategoryModel {
  id: number;
  ad: string;
  aciklama: string;
  menuSira: number;
  aktif: boolean;
  olusturmaTarih: string;
  guncelemeTarih: string;
}

export interface MenuCategorySaveModel {
  ad: string;
  aciklama: string;
  menuSira: number;
  aktif: boolean;
}

export interface MenuCategoryUpdateModel {
  id: number;
  ad: string;
  aciklama: string;
  menuSira: number;
  aktif: boolean;
}

export interface GenericBaseModel<T> {
  success: boolean;
  message: string;
  status: string;
  data: T;
}
