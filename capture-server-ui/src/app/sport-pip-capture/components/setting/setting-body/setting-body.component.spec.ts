import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingBodyComponent } from './setting-body.component';

describe('SettingBodyComponent', () => {
  let component: SettingBodyComponent;
  let fixture: ComponentFixture<SettingBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
