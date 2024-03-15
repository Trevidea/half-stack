import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOnDemandEventComponent } from './create-on-demand-event.component';

describe('CreateOnDemandEventComponent', () => {
  let component: CreateOnDemandEventComponent;
  let fixture: ComponentFixture<CreateOnDemandEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOnDemandEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOnDemandEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
