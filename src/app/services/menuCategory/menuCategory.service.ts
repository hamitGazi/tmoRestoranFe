import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {GenericBaseModel} from '../../model/masa/masa.model';
import {
  MenuCategoryModel,
  MenuCategorySaveModel,
  MenuCategoryUpdateModel
} from '../../model/menuCategory/menu-category.model';

@Injectable({
  providedIn: 'root'
})
export class MenuCategoryService {
  private apiUrl = 'http://localhost:8082/menu-category';

  constructor(private http: HttpClient) {}

  getAllMenuCategories(): Observable<GenericBaseModel<MenuCategoryModel[]>> {
    return this.http.get<GenericBaseModel<MenuCategoryModel[]>>(`${this.apiUrl}/all`);
  }

  getMenuCategoryById(id: any): Observable<GenericBaseModel<MenuCategoryModel>> {
    return this.http.get<GenericBaseModel<MenuCategoryModel>>(`${this.apiUrl}/${id}`);
  }

  saveMenuCategory(data: any): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
  }

  updateMenuCategory(data: any): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(`${this.apiUrl}/update`, data);
  }

  deleteMenuCategory(id: any): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }
}
