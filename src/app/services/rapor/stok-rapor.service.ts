import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {StokRaporModel} from '../../model/raporlar/rapor.model';

@Injectable({
  providedIn: 'root'
})
export class StokRaporService {
  private apiUrl = 'http://localhost:8082/rapor/stok';

  constructor(private http: HttpClient) {}

  getStokRaporlari(filters: any): Observable<GenericBaseModel<StokRaporModel[]>> {
    return this.http.post<GenericBaseModel<StokRaporModel[]>>(`${this.apiUrl}/all`, filters);
  }

  getIslemTipEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/islemTipi-enum`);
  }
}
