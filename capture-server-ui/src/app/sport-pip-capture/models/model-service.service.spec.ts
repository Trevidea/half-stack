import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModelServiceService } from './model-service.service';

fdescribe('ModelServiceService', () => {
  let service: ModelServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModelServiceService]
    });
    service = TestBed.inject(ModelServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // it('should create new event if data has no id', () => {
  //   const mockEvent = {
  //     sport: 'Football',
  //     level: 'Professional',
  //     program: 'World Cup',
  //     year: 2024,
  //     dt_event: '2024-05-15',
  //     tm_event: 1800,
  //     venue: { location: 'Stadium'},
  //     detail: { cityAddress:'Description',streetAdress:"city",type:'type' },
  //     title: 'Final Match',
  //     status: 'Scheduled',
  //     type: 'on-demand', 
  //   };
  //   const expectedResponse = { 
  //     sport: 'Football',
  //     level: 'Professional',
  //     program: 'World Cup',
  //     year: 2024,
  //     dt_event: '2024-05-15',
  //     tm_event: 1800,
  //     venue: { location: 'Stadium'},
  //     detail: { cityAddress:'Description',streetAdress:"city",type:'type' },
  //     title: 'Final Match',
  //     status: 'Scheduled',
  //     type: 'on-demand', 
  //   };

  //   service.saveEvent(mockEvent).subscribe(response => {
  //     expect(response).toEqual(mockEvent);
  //   });

  //   const req = httpMock.expectOne(`${service.modelsServerUrl}/event`);
  //   expect(req.request.method).toBe('POST');
  //   req.flush(expectedResponse);
  // });

  // it('should update event if data has an id', () => {
  //   const mockEvent = { id: 1, /* other mock event data */ };
  //   const expectedResponse = { /* expected response from the server */ };

  //   service.saveEvent(mockEvent).subscribe(response => {
  //     expect(response).toEqual(expectedResponse);
  //   });

  //   const req = httpMock.expectOne(`${service.modelsServerUrl}/event`);
  //   expect(req.request.method).toBe('PUT');
  //   req.flush(expectedResponse);
  // });
});
