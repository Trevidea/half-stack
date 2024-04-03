import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpComingEventDetilComponent } from './up-coming-event-detail.component';

describe('UpComingEventDetilComponent', () => {
  let component: UpComingEventDetilComponent;
  let fixture: ComponentFixture<UpComingEventDetilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpComingEventDetilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpComingEventDetilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
