import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel, MasaModel, MasaSaveModel, MasaUpdateModel} from '../../model/masa/masa.model';

@Injectable({
  providedIn: 'root'
})
export class MasaService {
  private apiUrl = 'http://localhost:8082/masalar';

  constructor(private http: HttpClient) {}

  getAllMasalar(): Observable<GenericBaseModel<MasaModel[]>> {
    return this.http.get<GenericBaseModel<MasaModel[]>>(`${this.apiUrl}/all`);
  }

  getMasaById(id: number): Observable<GenericBaseModel<MasaModel>> {
    return this.http.get<GenericBaseModel<MasaModel>>(`${this.apiUrl}/${id}`);
  }

  saveMasa(data: MasaSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
  }

  updateMasa(data: MasaUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deleteMasa(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getMasaKonumEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/konum-enum`);
  }

  getMasaDurumEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/durum-enum`);
  }
}
