import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuFiyatComponent} from './menu-fiyat.component';

describe('MenuFiyatComponent', () => {
  let component: MenuFiyatComponent;
  let fixture: ComponentFixture<MenuFiyatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuFiyatComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuFiyatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
