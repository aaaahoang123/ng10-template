import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyageChildrenViewComponent } from './voyage-children-view.component';

describe('VoyageChildrenViewComponent', () => {
  let component: VoyageChildrenViewComponent;
  let fixture: ComponentFixture<VoyageChildrenViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoyageChildrenViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyageChildrenViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
