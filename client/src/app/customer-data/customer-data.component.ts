import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ICliente } from '../models/models';
import { DataService } from '../services/data.service';


@Component({
   selector: 'app-customer-data',
   templateUrl: './customer-data.component.html',
   styleUrls: ['./customer-data.component.scss'],
   animations: [
      trigger('isCardVisible', [
         state('yes', style({ transform: 'translateY(0)'})),
         state('no', style({ transform: 'translateY(-140%)'})),
         transition('yes => no', animate('200ms ease-out')),
         transition('no => yes', animate('1000ms ease-in'))
      ])
   ]
})
export class CustomerDataComponent implements OnInit {
   cliente: ICliente;
   showData: boolean = false;
   isCardVisible: string = 'no';
   id: number;
   constructor(private route: ActivatedRoute,
      private ds: DataService) { }

   ngOnInit() {
      this.showData = false;
      this.route.params.subscribe((params: { id: string }) => {
         this.id = parseInt(params.id);
         if (this.id > 0){
            this.ds.getCliente(this.id).subscribe(
               data => {
                  this.cliente = data;
                  this.showData = true;
                  this.isCardVisible = 'yes';
               }
            )
         }
      });
   }
}
