import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Flash } from 'src/app/models/flash';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFlash = new EventEmitter();
  emitFlash: Subscription;

  constructor() { }

  setFlash(flash: Flash) {
    this.invokeFlash.emit(flash);
  }

}
