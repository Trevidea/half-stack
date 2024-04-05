import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectioGridListHeaderComponent } from './connectio-grid-list-header.component';

describe('ConnectioGridListHeaderComponent', () => {
  let component: ConnectioGridListHeaderComponent;
  let fixture: ComponentFixture<ConnectioGridListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectioGridListHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectioGridListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
