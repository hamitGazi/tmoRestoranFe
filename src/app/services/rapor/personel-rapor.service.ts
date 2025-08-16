import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {PersonelRaporModel} from '../../model/raporlar/rapor.model';


@Injectable({
  providedIn: 'root'
})
export class PersonelRaporService {
  private apiUrl = 'http://localhost:8082/rapor/personel';

  constructor(private http: HttpClient) {}

  getPersonelRaporlari(filters: any): Observable<GenericBaseModel<PersonelRaporModel[]>> {
    return this.http.post<GenericBaseModel<PersonelRaporModel[]>>(`${this.apiUrl}/all`, filters);
  }

  getRolEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/rol-enum`);
  }
}
