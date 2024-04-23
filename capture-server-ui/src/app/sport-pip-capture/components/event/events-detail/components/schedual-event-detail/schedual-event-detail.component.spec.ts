import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedualEventDetailComponent } from './schedual-event-detail.component';

describe('SchedualEventDetailComponent', () => {
  let component: SchedualEventDetailComponent;
  let fixture: ComponentFixture<SchedualEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedualEventDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedualEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
