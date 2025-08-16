export interface SatisRaporModel {
  id: number;
  tarih: string;
  odemeTuru: EnumRecord;
  toplamTutar: number;
  siparisSayisi: number;
}

export interface StokRaporModel {
  id: number;
  malzemeAdi: string;
  miktar: number;
  birim: string;
  kritikMiktar: number;
  islemTipi: EnumRecord;
  islemTarihi: string;
}

export interface GeriBildirimRaporModel {
  id: number;
  tarih: string;
  geriBildirimTuru: EnumRecord;
  puan: number;
  yorum: string;
}

export interface PersonelRaporModel {
  id: number;
  personelAdi: string;
  rol: EnumRecord;
  siparisSayisi: number;
  toplamSatis: number;
  calismaSuresi: number;
}

export interface MasaKullanimRaporModel {
  id: number;
  masaKonum: EnumRecord;
  kullanilanSure: number;
  siparisSayisi: number;
  tarih: string;
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
