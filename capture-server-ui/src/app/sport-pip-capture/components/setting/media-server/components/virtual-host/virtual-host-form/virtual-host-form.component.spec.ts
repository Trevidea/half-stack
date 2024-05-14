import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualHostFormComponent } from './virtual-host-form.component';

describe('VirtualHostFormComponent', () => {
  let component: VirtualHostFormComponent;
  let fixture: ComponentFixture<VirtualHostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualHostFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualHostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
