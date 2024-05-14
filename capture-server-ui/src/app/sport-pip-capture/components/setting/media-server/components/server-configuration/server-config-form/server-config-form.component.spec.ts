import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerConfigFormComponent } from './server-config-form.component';

describe('ServerConfigFormComponent', () => {
  let component: ServerConfigFormComponent;
  let fixture: ComponentFixture<ServerConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServerConfigFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServerConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
