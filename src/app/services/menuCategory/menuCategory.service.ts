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
  private apiUrl = 'http://localhost:8080/menu-category';

  constructor(private http: HttpClient) {}

  getAllMenuCategories(): Observable<GenericBaseModel<MenuCategoryModel[]>> {
    return this.http.get<GenericBaseModel<MenuCategoryModel[]>>(this.apiUrl);
  }

  getMenuCategoryById(id: number): Observable<GenericBaseModel<MenuCategoryModel>> {
    return this.http.get<GenericBaseModel<MenuCategoryModel>>(`${this.apiUrl}/${id}`);
  }

  saveMenuCategory(data: MenuCategorySaveModel): Observable<GenericBaseModel<number>> {
    return this.http.post<GenericBaseModel<number>>(this.apiUrl, data);
  }

  updateMenuCategory(data: MenuCategoryUpdateModel): Observable<GenericBaseModel<number>> {
    return this.http.put<GenericBaseModel<number>>(this.apiUrl, data);
  }

  deleteMenuCategory(id: number): Observable<GenericBaseModel<string>> {
    return this.http.delete<GenericBaseModel<string>>(`${this.apiUrl}/${id}`);
  }
}
