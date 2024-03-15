import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionHeaderComponent } from './connection-header.component';

describe('ConnectionHeaderComponent', () => {
  let component: ConnectionHeaderComponent;
  let fixture: ComponentFixture<ConnectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
