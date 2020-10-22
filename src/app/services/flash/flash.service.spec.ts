import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

import { FlashService } from './flash.service';

describe('FlashService', () => {
  let service: FlashService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EventEmitter,
        EventEmitterService
      ]
    });
    service = TestBed.inject(FlashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
