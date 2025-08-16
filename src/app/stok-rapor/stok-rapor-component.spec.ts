import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StokRaporComponent } from './stok-rapor-component';

describe('StokRaporComponent', () => {
  let component: StokRaporComponent;
  let fixture: ComponentFixture<StokRaporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StokRaporComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StokRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
