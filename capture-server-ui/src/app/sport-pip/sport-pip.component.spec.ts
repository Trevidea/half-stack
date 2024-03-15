import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportPipComponent } from './sport-pip.component';

describe('SportPipComponent', () => {
  let component: SportPipComponent;
  let fixture: ComponentFixture<SportPipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportPipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportPipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
