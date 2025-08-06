import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel, MasaModel} from '../../model/masa/masa.model';
import {SiparisModel, SiparisSaveModel, SiparisUpdateModel} from '../../model/siparis/siparis.model';
import {PersonelModel} from '../../model/personel/personel.model';


@Injectable({
  providedIn: 'root'
})
export class SiparisService {
  private apiUrl = 'http://localhost:8080/siparis';
  private masaApiUrl = 'http://localhost:8080/masalar';
  private personelApiUrl = 'http://localhost:8080/personel';

  constructor(private http: HttpClient) {}

  getAllSiparisler(): Observable<GenericBaseModel<SiparisModel[]>> {
    return this.http.get<GenericBaseModel<SiparisModel[]>>(this.apiUrl);
  }

  getSiparisById(id: number): Observable<GenericBaseModel<SiparisModel>> {
    return this.http.get<GenericBaseModel<SiparisModel>>(`${this.apiUrl}/${id}`);
  }

  saveSiparis(data: SiparisSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(this.apiUrl, data);
  }

  updateSiparis(data: SiparisUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(this.apiUrl, data);
  }

  deleteSiparis(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getSiparisDurumEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/durum-enum`);
  }

  getAllMasalar(): Observable<GenericBaseModel<MasaModel[]>> {
    return this.http.get<GenericBaseModel<MasaModel[]>>(this.masaApiUrl);
  }

  getAllPersoneller(): Observable<GenericBaseModel<PersonelModel[]>> {
    return this.http.get<GenericBaseModel<PersonelModel[]>>(this.personelApiUrl);
  }
}
