import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandEventSidebarComponent } from './on-demand-event-sidebar.component';

describe('OnDemandEventSidebarComponent', () => {
  let component: OnDemandEventSidebarComponent;
  let fixture: ComponentFixture<OnDemandEventSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnDemandEventSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnDemandEventSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
