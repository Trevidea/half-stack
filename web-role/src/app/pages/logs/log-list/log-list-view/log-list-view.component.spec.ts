import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogListViewComponent } from './log-list-view.component';

describe('LogListViewComponent', () => {
  let component: LogListViewComponent;
  let fixture: ComponentFixture<LogListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogListViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
