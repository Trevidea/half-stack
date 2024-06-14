import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUploadAuthenticationComponent } from './event-upload-authentication.component';

describe('EventUploadAuthenticationComponent', () => {
  let component: EventUploadAuthenticationComponent;
  let fixture: ComponentFixture<EventUploadAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventUploadAuthenticationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventUploadAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
