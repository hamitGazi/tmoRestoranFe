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
