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
  private apiUrl = 'http://localhost:8082/siparis-kalem';


  constructor(private http: HttpClient) {
  }

  getAllSiparisKalemleri(): Observable<GenericBaseModel<SiparisKalemiModel[]>> {
    return this.http.get<GenericBaseModel<SiparisKalemiModel[]>>(`${this.apiUrl}/all`);
  }

  getSiparisKalemiById(id: any): Observable<GenericBaseModel<SiparisKalemiModel[]>> {
    return this.http.get<GenericBaseModel<SiparisKalemiModel[]>>(`${this.apiUrl}/${id}`);
  }

  saveSiparisKalemi(data: SiparisKalemiSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
  }
  getKalemlerBySiparisId(siparisId: number): Observable<GenericBaseModel<SiparisKalemiModel[]>> {
    return this.http.get<GenericBaseModel<SiparisKalemiModel[]>>(`${this.apiUrl}/by-siparis/${siparisId}`);
  }
  updateSiparisKalemi(data: any): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deleteSiparisKalemi(id: any): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/delete/${id}`);
  }


}
