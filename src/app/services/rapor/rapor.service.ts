import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';

import {Injectable} from '@angular/core';
import {SatisRaporModel} from '../../model/raporlar/rapor.model';

@Injectable({
  providedIn: 'root'
})
export class RaporFilterService {
  private apiUrl = 'http://localhost:8080/rapor';
  private odemeApiUrl = 'http://localhost:8080/odeme';

  constructor(private http: HttpClient) {
  }

  getSatisRaporlari(tarihBaslangic?: string, tarihBitis?: string, odemeTuru?: string): Observable<GenericBaseModel<SatisRaporModel[]>> {
    let params: { [key: string]: string } = {};
    if (tarihBaslangic) params['tarihBaslangic'] = tarihBaslangic;
    if (tarihBitis) params['tarihBitis'] = tarihBitis;
    if (odemeTuru) params['odemeTuru'] = odemeTuru;
    return this.http.get<GenericBaseModel<SatisRaporModel[]>>(`${this.apiUrl}/satis`, {params});
  }

  getOdemeTurEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.odemeApiUrl}/tur-enum`);
  }
}
