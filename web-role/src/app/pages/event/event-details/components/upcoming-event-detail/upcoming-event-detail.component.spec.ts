import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpcomingEventDetailComponent } from './upcoming-event-detail.component';



describe('UpcomingEventDetailComponent', () => {
  let component: UpcomingEventDetailComponent;
  let fixture: ComponentFixture<UpcomingEventDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingEventDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UpcomingEventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
