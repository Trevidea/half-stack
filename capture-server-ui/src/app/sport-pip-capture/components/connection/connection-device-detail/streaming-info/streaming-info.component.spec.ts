import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingInfoComponent } from './streaming-info.component';

describe('StreamingInfoComponent', () => {
  let component: StreamingInfoComponent;
  let fixture: ComponentFixture<StreamingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
