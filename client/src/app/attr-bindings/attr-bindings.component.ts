import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { PageTitleService } from '../services/page-title.service';


@Component({
   selector: 'app-attr-bindings',
   templateUrl: './attr-bindings.component.html',
   styleUrls: ['./attr-bindings.component.scss'],
   animations: [
      trigger('isDivVisible', [
         state('yes', style({ transform: 'translateY(0)' })),
         state('no', style({ transform: 'translateY(-230%)' })),
         transition('yes => no', animate('200ms ease-out')),
         transition('no => yes', animate('1000ms ease-in'))
      ])
   ]
})
export class AttrBindingsComponent implements OnInit {
   divHeight: number;
   divWidth: number;
   grayBackground: boolean;
   imageSize: number;
   isDivVisible: string = 'no';

   constructor(private router: Router,
      private pts: PageTitleService) { }

   ngOnInit() {
      this.pts.setTitle("Attribute Bindings")
      this.divHeight = 60;
      this.divWidth = 90;
      this.grayBackground = false;
      this.imageSize = 150;
      setTimeout(() => this.isDivVisible = 'yes', 1 * 1000);
   }

   hideImage() {
      this.isDivVisible = 'no'
   }

   goBack() {
      this.router.navigate(['home']);
   }

}
