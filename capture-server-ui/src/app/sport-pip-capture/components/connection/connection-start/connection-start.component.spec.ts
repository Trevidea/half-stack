import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionStartComponent } from './connection-start.component';

describe('ConnectionStartComponent', () => {
  let component: ConnectionStartComponent;
  let fixture: ComponentFixture<ConnectionStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionStartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
