import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictSelectorComponent } from './district-selector.component';

describe('DistrictSelectorComponent', () => {
  let component: DistrictSelectorComponent;
  let fixture: ComponentFixture<DistrictSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
