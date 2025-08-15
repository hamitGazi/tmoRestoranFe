import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SiparisKalemComponent} from './siparis-kalem.component';

describe('SiparisKalemComponent', () => {
  let component: SiparisKalemComponent;
  let fixture: ComponentFixture<SiparisKalemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiparisKalemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SiparisKalemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
