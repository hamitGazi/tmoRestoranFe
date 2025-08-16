import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeriBildirimRaporComponent } from './geri-bildirim-rapor-component';

describe('GeriBildirimRaporComponent', () => {
  let component: GeriBildirimRaporComponent;
  let fixture: ComponentFixture<GeriBildirimRaporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeriBildirimRaporComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeriBildirimRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
