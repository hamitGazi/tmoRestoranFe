/*
export interface DashboardStat {
  label: string;
  value: number;
  icon?: string;
  color?: string;
}

export interface PieChartData {
  labels: string[];
  datasets: { data: number[]; backgroundColor: string[] }[];
}
*/
export interface DashboardOzetModel {
  toplamSiparis: number;
  toplamGelir: number;
  aktifMasalar: number;
  bekleyenRezervasyonlar: number;
}

export interface SiparisDurumGrafikModel {
  durum: string; // Enum: YENI, HAZIRLANIYOR, TAMAMLANDI, IPTAL
  adet: number;
}

export interface GenericBaseModel<T> {
  success: boolean;
  message: string;
  status: string;
  data: T;
}
