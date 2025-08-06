import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import {EnumRecord, GenericBaseModel} from '../../model/masa/masa.model';
import {StokModel, StokSaveModel, StokUpdateModel} from '../../model/stok/stok.model';
import {MenuItemModel} from '../../model/menu-item/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class StokService {
  private apiUrl = 'http://localhost:8080/stok';
  private menuItemApiUrl = 'http://localhost:8080/menu-item';

  constructor(private http: HttpClient) {}

  getAllStoklar(): Observable<GenericBaseModel<StokModel[]>> {
    return this.http.get<GenericBaseModel<StokModel[]>>(this.apiUrl);
  }

  getStokById(id: number): Observable<GenericBaseModel<StokModel>> {
    return this.http.get<GenericBaseModel<StokModel>>(`${this.apiUrl}/${id}`);
  }

  saveStok(data: StokSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(this.apiUrl, data);
  }

  updateStok(data: StokUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(this.apiUrl, data);
  }

  deleteStok(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

  getBirimEnum(): Observable<GenericBaseModel<EnumRecord[]>> {
    return this.http.get<GenericBaseModel<EnumRecord[]>>(`${this.apiUrl}/birim-enum`);
  }

  getAllMenuItems(): Observable<GenericBaseModel<MenuItemModel[]>> {
    return this.http.get<GenericBaseModel<MenuItemModel[]>>(this.menuItemApiUrl);
  }
}
