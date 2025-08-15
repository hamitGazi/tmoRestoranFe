import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {ReceteModel, ReceteSaveModel, ReceteUpdateModel} from '../../model/menuItemRecete/menuItemRecete.model';

@Injectable({
  providedIn: 'root'
})
export class MenuItemReceteService {
  private apiUrl = 'http://localhost:8082/menu-item-recete';

  constructor(private http: HttpClient) {}

  getAllReceteler(): Observable<GenericBaseModel<ReceteModel[]>> {
    return this.http.get<GenericBaseModel<ReceteModel[]>>(`${this.apiUrl}/all`);
  }

  getReceteById(id: any): Observable<GenericBaseModel<ReceteModel>> {
    return this.http.get<GenericBaseModel<ReceteModel>>(`${this.apiUrl}/${id}`);
  }

  getSiraliReceteKalemByMenuUrunId(menuUrunId: any): Observable<GenericBaseModel<ReceteModel[]>> {
    return this.http.get<GenericBaseModel<ReceteModel[]>>(`${this.apiUrl}/by-menu-urun/sirali/${menuUrunId}`);
  }

  saveRecete(data: any): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
  }

  updateRecete(data: any): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deleteRecete(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getBirimEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/birim-enum`);
  }
}
