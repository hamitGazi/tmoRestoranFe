import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonelRaporComponent } from './personel-rapor-component';

describe('PersonelRaporComponent', () => {
  let component: PersonelRaporComponent;
  let fixture: ComponentFixture<PersonelRaporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonelRaporComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonelRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
