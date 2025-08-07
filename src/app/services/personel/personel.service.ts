import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {PersonelModel, PersonelSaveModel, PersonelUpdateModel} from '../../model/personel/personel.model';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {
  private apiUrl = 'http://localhost:8082/personel';

  constructor(private http: HttpClient) {
  }

  getAllPersoneller(): Observable<GenericBaseModel<PersonelModel[]>> {
    return this.http.get<GenericBaseModel<PersonelModel[]>>(`${this.apiUrl}/all`);
  }

  getPersonelById(id: any): Observable<GenericBaseModel<PersonelModel>> {
    return this.http.get<GenericBaseModel<PersonelModel>>(`${this.apiUrl}/${id}`);
  }

  savePersonel(data: PersonelSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
  }

  updatePersonel(data: PersonelUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deletePersonel(id: any): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getRolEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/rol-enum`);
  }
}
