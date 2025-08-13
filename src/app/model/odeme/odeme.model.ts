export interface OdemeModel {
  id?:number;
  siparis?: SiparisOdemeModel;
  masa?:MasaModel;
  toplamTutar?:number;
  odemeYontem?: EnumRecord;
  odemeZaman?:Date;
  odemeDurum?:EnumRecord;

}

export interface OdemeSaveModel {
  id?:number;
  siparis?: number;
  toplamTutar?:number;
  odemeYontem?: EnumRecord;
  odemeZaman?:Date;
  odemeDurum?:EnumRecord;

}

export interface OdemeUpdateModel {
  id?:number;
  siparis?: number;
  toplamTutar?:number;
  odemeYontem?: EnumRecord;
  odemeZaman?:Date;
  odemeDurum?:EnumRecord;
}

export interface GenericBaseModel<T> {
  success: boolean;
  message: string;
  status: string;
  data: T;
}
export interface SiparisOdemeModel{
  id: number;
  toplamTutar: number;
  olusturmaZaman: Date,
  siparisDurum:EnumRecord
}
export interface EnumRecord {
  name: string;
  label: string;
}

export interface SiparisOption {
  id: number;
  musteriAd: string;
}

export interface MasaModel {
  id: number;
  qrKodUrl:string;
}
