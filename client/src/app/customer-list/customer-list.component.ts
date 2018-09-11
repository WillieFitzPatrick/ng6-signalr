import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICliente } from '../models/models';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
   clientes: ICliente[];
  constructor( private router: Router,
               private ds: DataService) { }

  ngOnInit() {
   this.ds.getClientes().subscribe(
      data => {
         this.clientes = data;
      }
   );
  }

  showData(id) {
   this.router.navigate(['/customercard', {outlets: {'data': [id]}}]);
 }

}
