import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageListSearchBarComponent } from './voyage-list-search-bar.component';

describe('VoyageListSearchBarComponent', () => {
  let component: VoyageListSearchBarComponent;
  let fixture: ComponentFixture<VoyageListSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageListSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageListSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
