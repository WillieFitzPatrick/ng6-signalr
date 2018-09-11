import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { ICliente } from '../models/models';
import { GlobalsService } from '../services/globals.service';
import { Router } from '@angular/router';
import { PageTitleService } from '../services/page-title.service';

@Component({
   selector: 'app-customer-card',
   templateUrl: './customer-card.component.html',
   styleUrls: ['./customer-card.component.scss']
})
export class CustomerCardComponent implements OnInit {
   cliente: ICliente;
   xForm: FormGroup;
   xFormTitle: string;

   constructor(private ds: DataService,
      private globals: GlobalsService,
      private router: Router,
      private fb: FormBuilder,
      private pts: PageTitleService) {
   }

   ngOnInit() {
      this.pts.setTitle("Customer Card")
   }

   goBack(){
      this.router.navigate(['home']);
   }
}
