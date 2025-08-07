import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MusteriBildirimComponent} from './musteri-bildirim.component';

describe('MusteriBildirimComponent', () => {
  let component: MusteriBildirimComponent;
  let fixture: ComponentFixture<MusteriBildirimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MusteriBildirimComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MusteriBildirimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
