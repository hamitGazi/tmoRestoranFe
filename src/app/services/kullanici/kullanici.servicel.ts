import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {
  KullaniciModel,
  KullaniciSaveModel,
  KullaniciSifreDegistirModel,
  KullaniciUpdateModel
} from '../../model/kullanici/kullanici.model';

@Injectable({
  providedIn: 'root'
})
export class KullaniciService {
  private apiUrl = 'http://localhost:8080/kullanici';

  constructor(private http: HttpClient) {
  }

  getAllKullanicilar(): Observable<GenericBaseModel<KullaniciModel[]>> {
    return this.http.get<GenericBaseModel<KullaniciModel[]>>(this.apiUrl);
  }

  getKullaniciById(id: number): Observable<GenericBaseModel<KullaniciModel>> {
    return this.http.get<GenericBaseModel<KullaniciModel>>(`${this.apiUrl}/${id}`);
  }

  saveKullanici(data: KullaniciSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(this.apiUrl, data);
  }

  updateKullanici(data: KullaniciUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(this.apiUrl, data);
  }

  deleteKullanici(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  degistirSifre(data: KullaniciSifreDegistirModel): Observable<GenericBaseModel<string>> {
    return this.http.post<GenericBaseModel<string>>(`${this.apiUrl}/sifre-degistir`, data);
  }

  getRolEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/rol-enum`);
  }
}
