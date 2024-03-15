import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareToPeopleComponent } from './share-to-people.component';

describe('ShareToPeopleComponent', () => {
  let component: ShareToPeopleComponent;
  let fixture: ComponentFixture<ShareToPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareToPeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareToPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
