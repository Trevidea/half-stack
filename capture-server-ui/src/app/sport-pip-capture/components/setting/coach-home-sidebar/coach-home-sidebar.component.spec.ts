import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachHomeSidebarComponent } from './coach-home-sidebar.component';

describe('CoachHomeSidebarComponent', () => {
  let component: CoachHomeSidebarComponent;
  let fixture: ComponentFixture<CoachHomeSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachHomeSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachHomeSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
