import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisRaporComponent } from './satis-rapor-component';

describe('SatisRaporComponent', () => {
  let component: SatisRaporComponent;
  let fixture: ComponentFixture<SatisRaporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SatisRaporComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
