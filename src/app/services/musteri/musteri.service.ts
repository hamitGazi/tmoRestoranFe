import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericBaseModel} from '../../model/masa/masa.model';
import {MusteriModel, MusteriSaveModel, MusteriUpdateModel} from '../../model/musteri/musteri.model';

@Injectable({
  providedIn: 'root'
})
export class MusteriService {
  private apiUrl = 'http://localhost:8082/musteri';

  constructor(private http: HttpClient) {}

  getAllMusteriler(): Observable<GenericBaseModel<MusteriModel[]>> {
    return this.http.get<GenericBaseModel<MusteriModel[]>>(`${this.apiUrl}/all`);
  }

  getMusteriById(id: any): Observable<GenericBaseModel<MusteriModel>> {
    return this.http.get<GenericBaseModel<MusteriModel>>(`${this.apiUrl}/${id}`);
  }

  saveMusteri(data: MusteriSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
  }

  updateMusteri(data: MusteriUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deleteMusteri(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }
}
