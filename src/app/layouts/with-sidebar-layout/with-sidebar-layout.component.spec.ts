import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithSidebarLayoutComponent } from './with-sidebar-layout.component';

describe('WithSidebarLayoutComponent', () => {
  let component: WithSidebarLayoutComponent;
  let fixture: ComponentFixture<WithSidebarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithSidebarLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithSidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
