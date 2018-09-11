import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageTitleService } from '../services/page-title.service';

@Component({
   selector: 'app-admin',
   templateUrl: './admin.component.html',
   styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

   constructor(private router: Router,
               private pts: PageTitleService) { }

   ngOnInit() {
      this.pts.setTitle("Admin Area")
   }

   goBack() {
      this.pts.setTitle("")
      this.router.navigate(['home']);
   }
}
