import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lzcomponent',
  templateUrl: './lzcomponent.component.html',
  styleUrls: ['./lzcomponent.component.scss']
})
export class LzcomponentComponent implements OnInit {

  constructor( private pts: PageTitleService,
               private router: Router) { }

  ngOnInit() {
     this.pts.setTitle("Lazy Loading");
  }

  goBack(){
   this.router.navigate(['home']);
  }

}
