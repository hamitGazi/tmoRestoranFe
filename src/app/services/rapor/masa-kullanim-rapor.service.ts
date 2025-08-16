import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {MasaKullanimRaporModel} from '../../model/raporlar/rapor.model';


@Injectable({
  providedIn: 'root'
})
export class MasaKullanimRaporService {
  private apiUrl = 'http://localhost:8082/rapor/masa-kullanim';

  constructor(private http: HttpClient) {}

  getMasaKullanimRaporlari(filters: any): Observable<GenericBaseModel<MasaKullanimRaporModel[]>> {
    return this.http.post<GenericBaseModel<MasaKullanimRaporModel[]>>(`${this.apiUrl}/all`, filters);
  }

  getMasaKonumEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/masaKonum-enum`);
  }
}
