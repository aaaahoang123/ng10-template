import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCategoryTableComponent } from './vehicle-category-table.component';

describe('VehicleCategoryTableComponent', () => {
  let component: VehicleCategoryTableComponent;
  let fixture: ComponentFixture<VehicleCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCategoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
