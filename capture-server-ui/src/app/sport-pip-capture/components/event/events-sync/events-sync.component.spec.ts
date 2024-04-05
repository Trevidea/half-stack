import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSyncComponent } from './events-sync.component';

describe('EventsSyncComponent', () => {
  let component: EventsSyncComponent;
  let fixture: ComponentFixture<EventsSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsSyncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
