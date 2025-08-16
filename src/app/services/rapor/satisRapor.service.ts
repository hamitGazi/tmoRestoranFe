import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';

import {Injectable} from '@angular/core';
import {SatisRaporModel} from '../../model/raporlar/rapor.model';
@Injectable({
  providedIn: 'root'
})
export class SatisRaporService {
  private apiUrl = 'http://localhost:8082/rapor/satis';

  constructor(private http: HttpClient) {}

  getSatisRaporlari(filters: any): Observable<GenericBaseModel<SatisRaporModel[]>> {
    return this.http.post<GenericBaseModel<SatisRaporModel[]>>(`${this.apiUrl}/all`, filters);
  }

  getOdemeYonEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/yontemOdeme-enum`);
  }
}
