import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class PageTitleService {
   public pageTitle: BehaviorSubject<string> = new BehaviorSubject(null);
   public waitingMessage: BehaviorSubject<string> = new BehaviorSubject(null);

   setTitle(title?: string) {
      this.pageTitle.next(title);
   }

   setWaitingMessage(waitingMessage?: string) {
      this.waitingMessage.next(waitingMessage);
   }
}
