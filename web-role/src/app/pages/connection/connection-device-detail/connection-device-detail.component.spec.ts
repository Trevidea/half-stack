import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionDeviceDetailComponent } from './connection-device-detail.component';

describe('ConnectionDeviceDetailComponent', () => {
  let component: ConnectionDeviceDetailComponent;
  let fixture: ComponentFixture<ConnectionDeviceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnectionDeviceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionDeviceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
