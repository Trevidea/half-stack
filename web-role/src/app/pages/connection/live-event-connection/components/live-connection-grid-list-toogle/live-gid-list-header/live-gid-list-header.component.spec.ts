import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveGidListHeaderComponent } from './live-gid-list-header.component';

describe('LiveGidListHeaderComponent', () => {
  let component: LiveGidListHeaderComponent;
  let fixture: ComponentFixture<LiveGidListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveGidListHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveGidListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
