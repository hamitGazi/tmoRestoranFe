import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
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
