import { Injectable } from '@angular/core';
import { Flash } from 'src/app/models/flash';
import { EventEmitterService } from '../event-emitter/event-emitter.service';

@Injectable({
  providedIn: 'root'
})
export class FlashService {

  flash: Flash = null;

  constructor(private eventEmitterService: EventEmitterService) { }

  success(message: string, keepAfterLocationChange: boolean) {
    this.flash = new Flash(message, 'success', keepAfterLocationChange);
    this.eventEmitterService.setFlash(this.flash);
  }

  error(message: string, keepAfterLocationChange: boolean) {
    this.flash = new Flash(message, 'error', keepAfterLocationChange);
    this.eventEmitterService.setFlash(this.flash);
  }

  clear() {
    if (this.flash) {
      if (!this.flash.keepAfterLocationChange) {
        this.flash = null;
        this.eventEmitterService.setFlash(this.flash);
      } else {
        this.flash.keepAfterLocationChange = false;
      }
    }
  }

}
