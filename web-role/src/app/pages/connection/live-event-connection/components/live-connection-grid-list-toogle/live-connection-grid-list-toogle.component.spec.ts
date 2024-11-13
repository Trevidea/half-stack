import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveConnectionGridListToogleComponent } from './live-connection-grid-list-toogle.component';

describe('LiveConnectionGridListToogleComponent', () => {
  let component: LiveConnectionGridListToogleComponent;
  let fixture: ComponentFixture<LiveConnectionGridListToogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveConnectionGridListToogleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveConnectionGridListToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
