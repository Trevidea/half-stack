import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingConfigurationComponent } from './streaming-configuration.component';

describe('StreamingConfigurationComponent', () => {
  let component: StreamingConfigurationComponent;
  let fixture: ComponentFixture<StreamingConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StreamingConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamingConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
