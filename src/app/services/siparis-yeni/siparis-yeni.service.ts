import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SiparisSaveModel} from '../../model/siparis/siparis.model';
import {Observable} from 'rxjs';
import {GenericBaseModel} from '../../model/masa/masa.model';

@Injectable({
  providedIn: 'root'
})

export class YeniSiparisService {
  private apiUrl = 'http://localhost:8082/siparis';

  constructor(private http: HttpClient) {}
   saveSiparis(data: any): Observable<GenericBaseModel<number>> {
     return this.http.post<GenericBaseModel<number>>(`${this.apiUrl}/save`, data);
   }

}


