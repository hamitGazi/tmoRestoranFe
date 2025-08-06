import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericBaseModel} from '../../model/masa/masa.model';
import {
  SiparisKalemiModel,
  SiparisKalemiSaveModel,
  SiparisKalemiUpdateModel
} from '../../model/siparis-kalem/siparis-kalem.model';
import {SiparisModel} from '../../model/siparis/siparis.model';
import {MenuItemModel} from '../../model/menu-item/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class SiparisKalemiService {
  private apiUrl = 'http://localhost:8080/siparis-kalemi';
  private siparisApiUrl = 'http://localhost:8080/siparis';
  private menuItemApiUrl = 'http://localhost:8080/menu-item';

  constructor(private http: HttpClient) {}

  getAllSiparisKalemleri(): Observable<GenericBaseModel<SiparisKalemiModel[]>> {
    return this.http.get<GenericBaseModel<SiparisKalemiModel[]>>(this.apiUrl);
  }

  getSiparisKalemiById(id: number): Observable<GenericBaseModel<SiparisKalemiModel>> {
    return this.http.get<GenericBaseModel<SiparisKalemiModel>>(`${this.apiUrl}/${id}`);
  }

  saveSiparisKalemi(data: SiparisKalemiSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(this.apiUrl, data);
  }

  updateSiparisKalemi(data: SiparisKalemiUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(this.apiUrl, data);
  }

  deleteSiparisKalemi(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getAllSiparisler(): Observable<GenericBaseModel<SiparisModel[]>> {
    return this.http.get<GenericBaseModel<SiparisModel[]>>(this.siparisApiUrl);
  }

  getAllMenuItems(): Observable<GenericBaseModel<MenuItemModel[]>> {
    return this.http.get<GenericBaseModel<MenuItemModel[]>>(this.menuItemApiUrl);
  }
}
