import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericBaseModel} from '../../model/masa/masa.model';
import {MenuItemModel, MenuItemSaveModel, MenuItemUpdateModel} from '../../model/menu-item/menu-item.model';
import {MenuCategoryModel} from '../../model/menuCategory/menu-category.model';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private apiUrl = 'http://localhost:8082/menu-item';


  constructor(private http: HttpClient) {}

  getAllMenuItems(): Observable<GenericBaseModel<MenuItemModel[]>> {
    return this.http.get<GenericBaseModel<MenuItemModel[]>>(`${this.apiUrl}/all`);
  }

  getMenuItemById(id: any): Observable<GenericBaseModel<MenuItemModel>> {
    return this.http.get<GenericBaseModel<MenuItemModel>>(`${this.apiUrl}/${id}`);
  }

  saveMenuItem(data: any): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
  }

  updateMenuItem(data: MenuItemUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deleteMenuItem(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }

}
