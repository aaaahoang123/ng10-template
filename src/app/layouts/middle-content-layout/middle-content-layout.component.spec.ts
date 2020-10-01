import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleContentLayoutComponent } from './middle-content-layout.component';

describe('MiddleContentLayoutComponent', () => {
  let component: MiddleContentLayoutComponent;
  let fixture: ComponentFixture<MiddleContentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiddleContentLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiddleContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
