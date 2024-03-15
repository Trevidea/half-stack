import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiceneseComponent } from './licenese.component';

describe('LiceneseComponent', () => {
  let component: LiceneseComponent;
  let fixture: ComponentFixture<LiceneseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiceneseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiceneseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
