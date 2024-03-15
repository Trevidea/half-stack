import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineModalComponent } from './inline-modal.component';

describe('ModalComponent', () => {
  let component: InlineModalComponent;
  let fixture: ComponentFixture<InlineModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
