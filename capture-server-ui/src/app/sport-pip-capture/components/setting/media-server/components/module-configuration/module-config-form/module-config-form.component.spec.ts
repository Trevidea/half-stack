import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleConfigFormComponent } from './module-config-form.component';

describe('ModuleConfigFormComponent', () => {
  let component: ModuleConfigFormComponent;
  let fixture: ComponentFixture<ModuleConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleConfigFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
