import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesConnectingComponent } from './devices-connecting.component';

describe('DevicesConnectingComponent', () => {
  let component: DevicesConnectingComponent;
  let fixture: ComponentFixture<DevicesConnectingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicesConnectingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesConnectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
