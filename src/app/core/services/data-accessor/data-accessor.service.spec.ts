import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { DataAccessorService } from './data-accessor.service';

describe('DataAccessorService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let service: DataAccessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(DataAccessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
