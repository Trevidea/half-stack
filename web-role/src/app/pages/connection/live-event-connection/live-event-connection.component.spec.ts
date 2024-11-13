import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveEventConnectionComponent } from './live-event-connection.component';

describe('LiveEventConnectionComponent', () => {
  let component: LiveEventConnectionComponent;
  let fixture: ComponentFixture<LiveEventConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveEventConnectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveEventConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
