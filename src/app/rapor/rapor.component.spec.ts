import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaporComponent } from './rapor.component';

describe('RaporComponent', () => {
  let component: RaporComponent;
  let fixture: ComponentFixture<RaporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RaporComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
