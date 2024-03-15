import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareToSocialComponent } from './share-to-social.component';

describe('ShareToSocialComponent', () => {
  let component: ShareToSocialComponent;
  let fixture: ComponentFixture<ShareToSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareToSocialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareToSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
