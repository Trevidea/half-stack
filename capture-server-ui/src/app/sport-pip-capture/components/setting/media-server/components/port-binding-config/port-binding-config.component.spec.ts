import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortBindingConfigComponent } from './port-binding-config.component';

describe('PortBindingConfigComponent', () => {
  let component: PortBindingConfigComponent;
  let fixture: ComponentFixture<PortBindingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortBindingConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortBindingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
