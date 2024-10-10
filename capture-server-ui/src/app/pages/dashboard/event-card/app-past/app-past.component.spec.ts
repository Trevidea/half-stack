import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPastComponent } from './app-past.component';

describe('AppPastComponent', () => {
  let component: AppPastComponent;
  let fixture: ComponentFixture<AppPastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppPastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppPastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
