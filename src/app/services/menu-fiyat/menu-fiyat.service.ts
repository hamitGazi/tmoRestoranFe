import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericBaseModel} from '../../model/masa/masa.model';
import {MenuFiyatModel, MenuFiyatSaveModel, MenuFiyatUpdateModel} from '../../model/menu-fiyat/menu-fiyat.model';
import {MenuItemModel} from '../../model/menu-item/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuFiyatService {
  private apiUrl = 'http://localhost:8082/menu-fiyat';


  constructor(private http: HttpClient) {}

  getAllMenuFiyatlar(): Observable<GenericBaseModel<MenuFiyatModel[]>> {
    return this.http.get<GenericBaseModel<MenuFiyatModel[]>>(`${this.apiUrl}/all`);
  }

  getMenuFiyatById(id: any): Observable<GenericBaseModel<MenuFiyatModel>> {
    return this.http.get<GenericBaseModel<MenuFiyatModel>>(`${this.apiUrl}/${id}`);
  }

  saveMenuFiyat(data: MenuFiyatSaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
  }

  updateMenuFiyat(data: MenuFiyatUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deleteMenuFiyat(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);

  }
}
