import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualHostComponent } from './virtual-host.component';

describe('VirtualHostComponent', () => {
  let component: VirtualHostComponent;
  let fixture: ComponentFixture<VirtualHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualHostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
