import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {SiparisModel, SiparisUpdateModel} from '../../model/siparis/siparis.model';


@Injectable({
  providedIn: 'root'
})
export class SiparisService {
  private apiUrl = 'http://localhost:8082/siparis';

  constructor(private http: HttpClient) {
  }

  getAllSiparisler(): Observable<GenericBaseModel<SiparisModel[]>> {
    return this.http.get<GenericBaseModel<SiparisModel[]>>(`${this.apiUrl}/all`);
  }

  getSiparisById(id: any): Observable<GenericBaseModel<SiparisModel>> {
    return this.http.get<GenericBaseModel<SiparisModel>>(`${this.apiUrl}/${id}`);
  }


  updateSiparis(data: SiparisUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deleteSiparis(id: any): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/delete/${id}`);
  }

  getSiparisDurumEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/siparisDurum-enum`);
  }

}
