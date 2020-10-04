import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageLabelComponent } from './voyage-label.component';

describe('VoyageLabelComponent', () => {
  let component: VoyageLabelComponent;
  let fixture: ComponentFixture<VoyageLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
