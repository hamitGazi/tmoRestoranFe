export interface SatisRaporModel {
  tarih: string;
  toplamTutar: number;
  odemeTuru: string;
  siparisSayisi: number;
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
