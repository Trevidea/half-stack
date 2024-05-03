import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CreateOnDemandEventComponent } from './create-on-demand-event.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomAdapter, CustomDateParserFormatter } from 'app/blocks/ngb-date-converter';

describe('CreateOnDemandEventComponent', () => {
  let component: CreateOnDemandEventComponent;
  let fixture: ComponentFixture<CreateOnDemandEventComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockRouter: any;

  // Before each test, set up the necessary components and providers
  beforeEach(async () => {
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']); // Create mock router

    await TestBed.configureTestingModule({
      declarations: [CreateOnDemandEventComponent],
      imports: [RouterTestingModule,FormsModule ],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: Router, useValue: mockRouter } ,
        { provide: NgbDateAdapter, useClass: CustomAdapter },
        { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }// Provide mock router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOnDemandEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test case: should create component
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test case: should emit cancel event when onCancelClick is called
  it('should emit cancel event when onCancelClick is called', () => {
    spyOn(component.cancel, 'emit');
    component.onCancelClick();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  // Test case: should emit save event when onSaveYesClick is called
  it('should emit save event when onSaveYesClick is called', () => {
    spyOn(component.save, 'emit');
    component.onSaveYesClick();
    expect(component.save.emit).toHaveBeenCalled();
  });

  // Test case: should navigate to "event" route when modal passEntry emits true
  it('should navigate to "event" route when modal passEntry emits true', () => {
    spyOn(mockRouter, 'navigate').and.stub();
    spyOn(mockModalService, 'open').and.returnValue({
      componentInstance: { passEntry: of(true) }
    } as any);
    component.modalOpenSM(null);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['event']);
  });
});
