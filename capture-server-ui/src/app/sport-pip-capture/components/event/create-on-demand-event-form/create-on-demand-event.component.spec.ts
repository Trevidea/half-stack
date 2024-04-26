import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CreateOnDemandEventComponent } from './create-on-demand-event.component';

fdescribe('CreateOnDemandEventComponent', () => {
  let component: CreateOnDemandEventComponent;
  let fixture: ComponentFixture<CreateOnDemandEventComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockRouter: any;
  beforeEach(async () => {
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);
    await TestBed.configureTestingModule({
      declarations: [CreateOnDemandEventComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: NgbModal, useValue: mockModalService }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreateOnDemandEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancel event when onCancelClick is called', () => {
    spyOn(component.cancel, 'emit');
    component.onCancelClick();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should emit save event when onSaveYesClick is called', () => {
    spyOn(component.save, 'emit');
    component.onSaveYesClick();
    expect(component.save.emit).toHaveBeenCalled();
  });

  it('should navigate to "event" route when modal passEntry emits true', () => {
    spyOn(mockRouter, 'navigate').and.stub();
    spyOn(mockModalService, 'open').and.returnValue({
      componentInstance: { passEntry: of(true) }
    } as any);
    component.modalOpenSM(null);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['event']);
  });

});
