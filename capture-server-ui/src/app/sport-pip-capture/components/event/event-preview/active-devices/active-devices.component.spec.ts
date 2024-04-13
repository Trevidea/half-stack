import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDevicesComponent } from './active-devices.component';

describe('ActiveDevicesComponent', () => {
  let component: ActiveDevicesComponent;
  let fixture: ComponentFixture<ActiveDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveDevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
