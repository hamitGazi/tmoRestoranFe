import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdemeComponent } from './odeme.component';

describe('OdemeComponent', () => {
  let component: OdemeComponent;
  let fixture: ComponentFixture<OdemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OdemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
