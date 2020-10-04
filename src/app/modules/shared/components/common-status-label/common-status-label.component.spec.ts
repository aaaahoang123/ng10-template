import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStatusLabelComponent } from './common-status-label.component';

describe('CommonStatusLabelComponent', () => {
  let component: CommonStatusLabelComponent;
  let fixture: ComponentFixture<CommonStatusLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonStatusLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonStatusLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
