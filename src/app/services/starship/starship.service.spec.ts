import { HttpService } from './../http/http.service';
import { TestBed } from '@angular/core/testing';

import { StarshipService } from './starship.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StarshipService', () => {
  let service: StarshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        HttpService
      ],
    });
    service = TestBed.inject(StarshipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
