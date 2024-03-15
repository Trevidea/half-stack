import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipHeaderComponent } from './pip-header.component';

describe('PipHeaderComponent', () => {
  let component: PipHeaderComponent;
  let fixture: ComponentFixture<PipHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
