import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserRole(): string {
    // Örnek: Gerçekte token veya backend'den alınır
    return 'YONETICI'; // GARSON, MUTFAK, KASA, YONETICI
  }
}
