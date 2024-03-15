import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDetailsPersonalComponent } from './emp-details-personal.component';

describe('EmpDetailsPersonalComponent', () => {
  let component: EmpDetailsPersonalComponent;
  let fixture: ComponentFixture<EmpDetailsPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpDetailsPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpDetailsPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
