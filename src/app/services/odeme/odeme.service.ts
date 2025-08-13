import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {OdemeModel, OdemeSaveModel, OdemeUpdateModel} from '../../model/odeme/odeme.model';

@Injectable({
  providedIn: 'root'
})
export class OdemeService {
  private apiUrl = 'http://localhost:8082/odeme';


  constructor(private http: HttpClient) {
  }

  getAllOdemeler(): Observable<GenericBaseModel<OdemeModel[]>> {
    return this.http.get<GenericBaseModel<OdemeModel[]>>(`${this.apiUrl}/all`);
  }

  getOdemeById(id: any): Observable<GenericBaseModel<OdemeModel>> {
    return this.http.get<GenericBaseModel<OdemeModel>>(`${this.apiUrl}/${id}`);
  }

  saveOdeme(data: OdemeSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
  }

  updateOdeme(data: OdemeUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deleteOdeme(id: any): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getOdemeYonEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/yontemOdeme-enum`);
  }
  getOdemeDurumEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/durumOdeme-enum`);
  }

  /* getAllSiparisler(): Observable<GenericBaseModel<SiparisModel[]>> {
     return this.http.get<GenericBaseModel<SiparisModel[]>>(this.siparisApiUrl);
   }*/
}
