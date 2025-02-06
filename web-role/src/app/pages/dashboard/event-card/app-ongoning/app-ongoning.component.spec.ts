import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOngoningComponent } from './app-ongoning.component';

describe('AppOngoningComponent', () => {
  let component: AppOngoningComponent;
  let fixture: ComponentFixture<AppOngoningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppOngoningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppOngoningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
