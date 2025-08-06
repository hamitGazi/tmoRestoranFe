import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel, MasaModel} from '../../model/masa/masa.model';
import {
  RezervasyonModel,
  RezervasyonSaveModel,
  RezervasyonUpdateModel
} from '../../model/rezervasyon/rezervasyon.model';
import {MusteriModel} from '../../model/musteri/musteri.model';

@Injectable({
  providedIn: 'root'
})
export class RezervasyonService {
  private apiUrl = 'http://localhost:8080/rezervasyon';
  private musteriApiUrl = 'http://localhost:8080/musteri';
  private masaApiUrl = 'http://localhost:8080/masalar';

  constructor(private http: HttpClient) {}

  getAllRezervasyonlar(): Observable<GenericBaseModel<RezervasyonModel[]>> {
    return this.http.get<GenericBaseModel<RezervasyonModel[]>>(this.apiUrl);
  }

  getRezervasyonById(id: number): Observable<GenericBaseModel<RezervasyonModel>> {
    return this.http.get<GenericBaseModel<RezervasyonModel>>(`${this.apiUrl}/${id}`);
  }

  saveRezervasyon(data: RezervasyonSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(this.apiUrl, data);
  }

  updateRezervasyon(data: RezervasyonUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(this.apiUrl, data);
  }

  deleteRezervasyon(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getDurumEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/durum-enum`);
  }

  getAllMusteriler(): Observable<GenericBaseModel<MusteriModel[]>> {
    return this.http.get<GenericBaseModel<MusteriModel[]>>(this.musteriApiUrl);
  }

  getAllMasalar(): Observable<GenericBaseModel<MasaModel[]>> {
    return this.http.get<GenericBaseModel<MasaModel[]>>(this.masaApiUrl);
  }
}
