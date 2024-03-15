import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDetailViewComponent } from './list-detail-view.component';

describe('ListDetailViewComponent', () => {
  let component: ListDetailViewComponent;
  let fixture: ComponentFixture<ListDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
