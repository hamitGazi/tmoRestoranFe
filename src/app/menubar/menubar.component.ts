import {Component, OnInit, signal} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {AuthService} from '../services/masa/AuthService';
import {MenubarModule} from 'primeng/menubar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
  standalone: true,
  imports: [MenubarModule]
})/*
export class MenubarComponent implements OnInit {
  items = signal<MenuItem[]>([]);

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  const role = this.authService.getUserRole();
    this.items.set(this.getMenuItems(role));
  }

  private getMenuItems(role: string): MenuItem[] {
    const menuItems: MenuItem[] = [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-line',
        routerLink: '/dashboard'
      },
      {
        label: 'Masalar',
        icon: 'pi pi-table',
        routerLink: '/masalar'
      },
      {
        label: 'Menü',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Kategoriler',
            icon: 'pi pi-list',
            routerLink: '/menu-category'
          },
          {
            label: 'Ürünler',
            icon: 'pi pi-shopping-bag',
            routerLink: '/menu-item'
          },
          {
            label: 'Fiyatlar',
            icon: 'pi pi-dollar',
            routerLink: '/menu-fiyat'
          }
        ]
      },
      {
        label: 'Siparişler',
        icon: 'pi pi-shopping-cart',
        items: [
          {
            label: 'Yeni Sipariş',
            icon: 'pi pi-plus',
            routerLink: '/siparis/yeni'
          },
          {
            label: 'Sipariş Listesi',
            icon: 'pi pi-list',
            routerLink: '/siparis-list'
          },
          {
            label: 'Sipariş Kalemleri',
            icon: 'pi pi-tags',
            routerLink: '/siparis-kalemi'
          }
        ]
      },
      {
        label: 'Müşteriler',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Müşteri Listesi',
            icon: 'pi pi-user',
            routerLink: '/musteri'
          },
          {
            label: 'Geri Bildirimler',
            icon: 'pi pi-comment',
            routerLink: '/musteri-bildirim'
          }
        ]
      },
      {
        label: 'Ödemeler',
        icon: 'pi pi-wallet',
        routerLink: '/odeme'
      },
      {
        label: 'Personel',
        icon: 'pi pi-user-plus',
        routerLink: '/personel'
      },
      {
  label: 'Stok',
  icon: 'pi pi-box',
  items: [
    {
      label: 'Hammadde Stokları',
      icon: 'pi pi-box',
      routerLink: '/stok/hammadde'
    },
    {
      label: 'MenuItem Reçete',
      icon: 'pi pi-list',
      routerLink: '/stok/recete'
    }
  ]
},
      {
        label: 'Raporlar',
        icon: 'pi pi-chart-bar',
        routerLink: '/rapor'
      },
      {
        label: 'Rezervasyonlar',
        icon: 'pi pi-calendar',
        routerLink: '/rezervasyon'
      },
      {
        label: 'Kullanıcılar',
        icon: 'pi pi-users',
        routerLink: '/kullanici'
      }
    ];
    /!*
        // Role göre filtreleme
        if (role === 'GARSON') {
          return menuItems.filter(item => ['Dashboard', 'Masalar', 'Siparişler', 'Müşteriler', 'Rezervasyonlar'].includes(item.label!));
        } else if (role === 'MUTFAK') {
          return menuItems.filter(item => ['Dashboard', 'Siparişler', 'Stok'].includes(item.label!));
        } else if (role === 'KASA') {
          return menuItems.filter(item => ['Dashboard', 'Siparişler', 'Ödemeler'].includes(item.label!));
        }
        return menuItems; // YONETICI için tüm menü
      }*!/


    // 🎯 Role göre filtreleme
    switch (role) {
      case 'GARSON':
        return menuItems.filter(item =>
          ['Dashboard', 'Masalar', 'Siparişler', 'Müşteriler', 'Rezervasyonlar'].includes(item.label!)
        );
      case 'MUTFAK':
        return menuItems.filter(item =>
          ['Dashboard', 'Siparişler', 'Stok'].includes(item.label!)
        );
      case 'KASA':
        return menuItems.filter(item =>
          ['Dashboard', 'Siparişler', 'Ödemeler'].includes(item.label!)
        );
      case 'MUSTERI':
        return [
          {
            label: 'Sipariş Ver',
            icon: 'pi pi-qrcode',
            routerLink: '/masa/qr/:qrKod' // 👈 QR kodla sipariş başlatma
          }
        ];
      default:
        return menuItems; // YÖNETİCİ için tüm menü
    }
  }
}
*/
export class MenubarComponent implements OnInit {
  items = signal<MenuItem[]>([]);

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.items.set(this.getMenuItems());
  }

  private getMenuItems(): MenuItem[] {
    return [
      {
        label: 'Dashboard',
        icon: 'pi pi-chart-line',
        routerLink: '/dashboard'
      },
      {
        label: 'Masalar',
        icon: 'pi pi-table',
        routerLink: '/masalar'
      },
      {
        label: 'Menü',
        icon: 'pi pi-book',
        items: [
          {
            label: 'Kategoriler',
            icon: 'pi pi-list',
            routerLink: '/menu-category'
          },
          {
            label: 'Ürünler',
            icon: 'pi pi-shopping-bag',
            routerLink: '/menu-item'
          },
          {
            label: 'Fiyatlar',
            icon: 'pi pi-dollar',
            routerLink: '/menu-fiyat'
          }
        ]
      },
      {
        label: 'Siparişler',
        icon: 'pi pi-shopping-cart',
        items: [
          {
            label: 'Yeni Sipariş',
            icon: 'pi pi-plus',
            routerLink: '/siparis/yeni'
          },
          {
            label: 'Sipariş Listesi',
            icon: 'pi pi-list',
            routerLink: '/siparis-list'
          },
          {
            label: 'Sipariş Kalemleri',
            icon: 'pi pi-tags',
            routerLink: '/siparis-kalemi'
          }
        ]
      },
      {
        label: 'Müşteriler',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Müşteri Listesi',
            icon: 'pi pi-user',
            routerLink: '/musteri'
          },
          {
            label: 'Geri Bildirimler',
            icon: 'pi pi-comment',
            routerLink: '/musteri-bildirim'
          }
        ]
      },
      {
        label: 'Ödemeler',
        icon: 'pi pi-wallet',
        routerLink: '/odeme'
      },
      {
        label: 'Personel',
        icon: 'pi pi-user-plus',
        routerLink: '/personel'
      },
      {
        label: 'Stok',
        icon: 'pi pi-box',
        items: [
          {
            label: 'Hammadde Stokları',
            icon: 'pi pi-box',
            routerLink: '/stok/hammadde'
          },
          {
            label: 'MenuItem Reçete',
            icon: 'pi pi-list',
            routerLink: '/stok/recete'
          }
        ]
      },
      {
        label: 'Raporlar',
        icon: 'pi pi-chart-bar',
        items: [
          { label: 'Satış Raporları', icon: 'pi pi-chart-line', routerLink: '/rapor/satis' },
          { label: 'Stok Raporları', icon: 'pi pi-box', routerLink: '/rapor/stok' },
          { label: 'Geri Bildirim Raporları', icon: 'pi pi-comment', routerLink: '/rapor/geri-bildirim' },
          { label: 'Personel Performans', icon: 'pi pi-user', routerLink: '/rapor/personel' },
          { label: 'Masa Kullanım', icon: 'pi pi-table', routerLink: '/rapor/masa' }
        ]
      },
      {
        label: 'Rezervasyonlar',
        icon: 'pi pi-calendar',
        routerLink: '/rezervasyon'
      },
      {
        label: 'Kullanıcılar',
        icon: 'pi pi-users',
        routerLink: '/kullanici'
      }
    ];
  }
}
