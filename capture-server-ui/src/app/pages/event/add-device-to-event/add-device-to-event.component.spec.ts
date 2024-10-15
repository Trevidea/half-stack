import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceToEventComponent } from './add-device-to-event.component';

describe('AddDeviceToEventComponent', () => {
  let component: AddDeviceToEventComponent;
  let fixture: ComponentFixture<AddDeviceToEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeviceToEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeviceToEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
