import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingEventComponent } from './up-coming-event.component';

describe('UpComingEventComponent', () => {
  let component: UpComingEventComponent;
  let fixture: ComponentFixture<UpComingEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpComingEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpComingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
