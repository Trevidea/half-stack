import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingInfoDetailsComponent } from './streaming-info-details.component';

describe('StreamingInfoDetailsComponent', () => {
  let component: StreamingInfoDetailsComponent;
  let fixture: ComponentFixture<StreamingInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingInfoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamingInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
