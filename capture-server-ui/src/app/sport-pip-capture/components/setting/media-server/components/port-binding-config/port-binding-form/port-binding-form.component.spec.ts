import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortBindingFormComponent } from './port-binding-form.component';

describe('PortBindingFormComponent', () => {
  let component: PortBindingFormComponent;
  let fixture: ComponentFixture<PortBindingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortBindingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortBindingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
