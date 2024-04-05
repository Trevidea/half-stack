import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionGridComponent } from './connection-grid.component';

describe('ConnectionGridComponent', () => {
  let component: ConnectionGridComponent;
  let fixture: ComponentFixture<ConnectionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
