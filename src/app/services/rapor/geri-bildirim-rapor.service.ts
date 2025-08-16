import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {GeriBildirimRaporModel} from '../../model/raporlar/rapor.model';


@Injectable({
  providedIn: 'root'
})
export class GeriBildirimRaporService {
  private apiUrl = 'http://localhost:8082/rapor/geri-bildirim';

  constructor(private http: HttpClient) {}

  getGeriBildirimRaporlari(filters: any): Observable<GenericBaseModel<GeriBildirimRaporModel[]>> {
    return this.http.post<GenericBaseModel<GeriBildirimRaporModel[]>>(`${this.apiUrl}/all`, filters);
  }

  getGeriBildirimTurEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/geriBildirimTuru-enum`);
  }
}
