import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveGirdComponent } from './live-gird.component';

describe('LiveGirdComponent', () => {
  let component: LiveGirdComponent;
  let fixture: ComponentFixture<LiveGirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveGirdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveGirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
