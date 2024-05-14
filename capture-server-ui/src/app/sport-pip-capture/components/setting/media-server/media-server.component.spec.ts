import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaServerComponent } from './media-server.component';

describe('MediaServerComponent', () => {
  let component: MediaServerComponent;
  let fixture: ComponentFixture<MediaServerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaServerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
