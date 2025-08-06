import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {OdemeModel, OdemeSaveModel, OdemeUpdateModel} from '../../model/odeme/odeme.model';
import {SiparisModel} from '../../model/siparis/siparis.model';

@Injectable({
  providedIn: 'root'
})
export class OdemeService {
  private apiUrl = 'http://localhost:8080/odeme';
  private siparisApiUrl = 'http://localhost:8080/siparis';

  constructor(private http: HttpClient) {}

  getAllOdemeler(): Observable<GenericBaseModel<OdemeModel[]>> {
    return this.http.get<GenericBaseModel<OdemeModel[]>>(this.apiUrl);
  }

  getOdemeById(id: number): Observable<GenericBaseModel<OdemeModel>> {
    return this.http.get<GenericBaseModel<OdemeModel>>(`${this.apiUrl}/${id}`);
  }

  saveOdeme(data: OdemeSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(this.apiUrl, data);
  }

  updateOdeme(data: OdemeUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(this.apiUrl, data);
  }

  deleteOdeme(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getOdemeTurEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/tur-enum`);
  }

  getAllSiparisler(): Observable<GenericBaseModel<SiparisModel[]>> {
    return this.http.get<GenericBaseModel<SiparisModel[]>>(this.siparisApiUrl);
  }
}
