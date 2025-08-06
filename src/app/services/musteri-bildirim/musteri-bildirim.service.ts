import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {
  MusteriBildirimModel,
  MusteriBildirimSaveModel,
  MusteriBildirimUpdateModel
} from '../../model/musteri-bildirim/musteri-bildirim.model';
import {MusteriModel} from '../../model/musteri/musteri.model';

@Injectable({
  providedIn: 'root'
})
export class MusteriBildirimService {
  private apiUrl = 'http://localhost:8080/musteri-bildirim';
  private musteriApiUrl = 'http://localhost:8080/musteri';

  constructor(private http: HttpClient) {}

  getAllMusteriBildirimler(): Observable<GenericBaseModel<MusteriBildirimModel[]>> {
    return this.http.get<GenericBaseModel<MusteriBildirimModel[]>>(this.apiUrl);
  }

  getMusteriBildirimById(id: number): Observable<GenericBaseModel<MusteriBildirimModel>> {
    return this.http.get<GenericBaseModel<MusteriBildirimModel>>(`${this.apiUrl}/${id}`);
  }

  saveMusteriBildirim(data: MusteriBildirimSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(this.apiUrl, data);
  }

  updateMusteriBildirim(data: MusteriBildirimUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(this.apiUrl, data);
  }

  deleteMusteriBildirim(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getBildirimTurEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/tur-enum`);
  }

  getAllMusteriler(): Observable<GenericBaseModel<MusteriModel[]>> {
    return this.http.get<GenericBaseModel<MusteriModel[]>>(this.musteriApiUrl);
  }
}
