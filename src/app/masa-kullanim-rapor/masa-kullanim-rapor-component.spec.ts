import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasaKullanimRaporComponent } from './masa-kullanim-rapor-component';

describe('MasaKullanimRaporComponent', () => {
  let component: MasaKullanimRaporComponent;
  let fixture: ComponentFixture<MasaKullanimRaporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasaKullanimRaporComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasaKullanimRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
