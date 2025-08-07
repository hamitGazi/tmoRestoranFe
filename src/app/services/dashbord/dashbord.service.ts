import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GenericBaseModel} from '../../model/masa/masa.model';
import {DashboardOzetModel, SiparisDurumGrafikModel} from '../../model/dashbord/dashbord.model';

@Injectable({providedIn: 'root'})
/*
export class DashboardService {
  private apiUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {}

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/stats`);
  }

  getOdemeYontemDistribution(): Observable<any> {
    return this.http.get(`${this.apiUrl}/odeme-yontem`);
  }

  getSiparisDurumuDistribution(): Observable<any> {
    return this.http.get(`${this.apiUrl}/siparis-durum`);
  }
}
*/

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8080/dashboard';

  constructor(private http: HttpClient) {
  }

  getOzet(): Observable<GenericBaseModel<DashboardOzetModel>> {
    return this.http.get<GenericBaseModel<DashboardOzetModel>>(`${this.apiUrl}/ozet`);
  }

  getSiparisDurumGrafik(): Observable<GenericBaseModel<SiparisDurumGrafikModel[]>> {
    return this.http.get<GenericBaseModel<SiparisDurumGrafikModel[]>>(`${this.apiUrl}/siparis-durum-grafik`);
  }
}
