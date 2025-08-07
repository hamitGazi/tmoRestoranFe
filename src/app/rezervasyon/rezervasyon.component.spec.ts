import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RezervasyonComponent} from './rezervasyon.component';

describe('RezervasyonComponent', () => {
  let component: RezervasyonComponent;
  let fixture: ComponentFixture<RezervasyonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RezervasyonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RezervasyonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
