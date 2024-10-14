import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveConnectionHeaderComponent } from './live-connection-header.component';

describe('LiveConnectionHeaderComponent', () => {
  let component: LiveConnectionHeaderComponent;
  let fixture: ComponentFixture<LiveConnectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveConnectionHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveConnectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
