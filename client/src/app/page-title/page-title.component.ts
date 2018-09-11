import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../services/page-title.service';
import { IPageTitle } from '../models/models';
import { Subscription } from 'rxjs';

@Component({
   selector: 'app-page-title',
   templateUrl: './page-title.component.html',
   styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
   pageTitle: IPageTitle = {"title": "", "waitingmessage":""};
   
   sbs_pageTitle: Subscription;
   sbs_waitingMessage: Subscription;

   constructor( private pts: PageTitleService ) { 
   }

   ngOnInit() {
      this.sbs_pageTitle = this.pts.pageTitle.subscribe(
         title => {
            this.pageTitle.title = title;
         }
      );
      this.sbs_waitingMessage = this.pts.waitingMessage.subscribe(
         message => {
            this.pageTitle.waitingmessage = (message) ? '** ' + message + ' **' : null;
         }
      );
   }

   ngOnDestroy(){
      if (this.sbs_pageTitle){
         this.sbs_pageTitle.unsubscribe();
      }
      if (this.sbs_waitingMessage){
         this.sbs_waitingMessage.unsubscribe();
      }
   }

}