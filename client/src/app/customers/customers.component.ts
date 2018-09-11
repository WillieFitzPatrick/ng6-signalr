import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../services/data.service';
import { ICliente, ITipoDoc, ICondicionIVA } from '../models/models';
import { GlobalsService } from '../services/globals.service';
import { Subscription } from 'rxjs';
import { PageTitleService } from '../services/page-title.service';

@Component({
   selector: 'app-customers',
   templateUrl: './customers.component.html',
 })
 export class CustomersComponent implements OnInit, OnDestroy {
   sort;
   @ViewChild(MatSort) set content(content: ElementRef) {
      this.sort = content;
      if (this.sort){
         this.dataSource.sort = this.sort;
         this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
               // case 'CCosto': return item.CCosto.CCosto;
               // }
               default: return item[property];
            }
         }
      }
   }

   displayedColumns = [ 'Cliente', 'Fantasia', 'Direccion', 'CondicionIVA', 'Estado'];
   dataSource = new MatTableDataSource<ICliente>();
   currentView: number = 0;
   showMailError: boolean = false;
   showNameError: boolean = false;

   cnt_clientes: number = 0;
   clientes: ICliente[];
   cliente: ICliente;
   rowSelected: ICliente;
   sbs_TiposDoc: Subscription;
   TiposDoc: ITipoDoc[];
   sbs_CondicionesIVA: Subscription;
   CondicionesIVA: ICondicionIVA[];

   xForm: FormGroup;
   xFormTitle: string = "Customers Update";

   waitingMsg: string = "";
   actionsToolbar;
   selectedView: string = 'grid';

   constructor( private ds: DataService,
                private globals: GlobalsService,  
                private router: Router,
                private fb: FormBuilder,
                private pts: PageTitleService ) {

      
   }

   ngOnInit() {

      this.pts.setTitle("Customers")  
      this.sbs_TiposDoc = this.globals.TiposDoc.subscribe( 
         data => {
            this.TiposDoc = data;
         }
      )
      this.sbs_CondicionesIVA = this.globals.CondicionesIVA.subscribe( 
         data => {
            this.CondicionesIVA = data;
         }
      )
      this.getData();
      this.dataSource.filterPredicate =  (data, filter) => (data["filtertext"].indexOf(filter) !== -1 );
      this.xForm = this.fb.group( {
         Fantasia: ['',Validators.required],
         Cliente: ['',Validators.required],
         Calle: ['',Validators.required],
         CodPos: ['',Validators.required],
         Ciudad: ['',Validators.required],
         Provincia: ['',Validators.required],
         Telefono: ['',Validators.required],
         Mail: ['',Validators.required],
         TipoDoc: ['',Validators.required],
         NroDoc: ['',Validators.required],
         CondicionIVA: ['',Validators.required],
         Estado: ['',Validators.required],
       });

      this.actionsToolbar = {
         "icon": "more_vert",
         "buttons": [
            { "value": "nuevo", "display": "Nuevo", "icon": "add", "callbackFn": "nuevo", "callbackParam": null, "disabled": false},
            { "value": "editar", "display": "Editar", "icon": "edit", "callbackFn": "editar", "callbackParam": null, "disabled": true },
            { "value": "copiar", "display": "Copiar", "icon": "file_copy", "callbackFn": "copiar", "callbackParam": null, "disabled": true },
            { "value": "eliminar", "display": "Eliminar", "icon": "delete_forever", "callbackFn": "eliminar", "callbackParam": null, "disabled": true },
            { "value": "refresh", "display": "Actualizar", "icon": "cached", "callbackFn": "getData", "callbackParam": null, "disabled": false },
            { "value": "close", "display": "Cerrar", "icon": "close", "callbackFn": "gotoHome", "callbackParam": null, "disabled": false }
         ]
      }; 
   }

   getData(){
      this.waitingMsg = "Loading customers ..."
      this.currentView = 0;
      this.ds.getClientes().subscribe(
         data => {
            this.clientes = data;
            this.cnt_clientes = this.clientes.length;
            this.clientes.map( e => {
               e["filtertext"]=e.Cliente+'|'+e.Fantasia+'|'+e.NroDoc+'|'+e.Calle+'|'+e.Ciudad+'|'+e.Provincia;
            });

            this.currentView = 2;
            this.dataSource = new MatTableDataSource(this.clientes);

         }
      );
   }

   rowClicked(row: any): void {
      this.rowSelected = (this.rowSelected == row) ? null : row;
      this.actionsToolbar.buttons.find( e => e.value == 'editar').disabled = (this.rowSelected == null);
      this.actionsToolbar.buttons.find( e => e.value == 'copiar').disabled = (this.rowSelected == null);    
      this.actionsToolbar.buttons.find( e => e.value == 'eliminar').disabled = (this.rowSelected == null);    
   }

   getBackgroundColor( row: any ) { 
      return (this.rowSelected == row) ? "lightgray" : "white";
   }

   applyFilter( _filter: string ) {
      this.dataSource.filter = _filter;
   }

   nuevo(){
      this.cliente = null;
      this.waitingMsg = "Loading Customer definition ..."
      this.currentView = 0;
      this.ds.getCliente(0)
         .subscribe( 
            data => {
               this.cliente = data;
               this.patchForm();
               this.xForm.patchValue( {
                  Estado: true
               })  
               this.currentView = 3;
            },
            error => {
               this.globals.showError("clientes", "getModelo(0)", error);
               this.currentView = 2;
            }
         );
   }

   editar(){
      this.cliente = null;
      this.waitingMsg = "Buscando datos de la cliente ..."
      this.currentView = 0;
      this.ds.getCliente(this.rowSelected.Id)
         .subscribe( 
            data => {
               this.cliente = data;
               this.patchForm();
               this.currentView = 3;
            },
            error => {
               this.globals.showError("clientes", `getcliente(${this.rowSelected.Id})`, error);
               this.currentView = 2;
            }
         );     
   }

   copiar(){
      this.cliente = null;
      this.waitingMsg = "Buscando datos de la cliente ..."
      this.currentView = 0;
      this.ds.getCliente(this.rowSelected.Id)
         .subscribe( 
            data => {
               this.cliente = data;
               this.cliente.Id = 0; // muy importante para que lo tome como alta !!!!
               this.patchForm();
               this.currentView = 3;
            },
            error => {
               this.globals.showError("clientes", `getcliente(${this.rowSelected.Id})`, error);
               this.currentView = 2;
            }
         );
   }

   patchForm() {
      this.xForm.patchValue( {

         Fantasia: this.cliente.Fantasia,
         Cliente: this.cliente.Cliente,
         Calle: this.cliente.Calle,
         CodPos: this.cliente.CodPos,
         Ciudad: this.cliente.Ciudad,
         Provincia: this.cliente.Provincia,
         Telefono: this.cliente.Telefono,
         Mail: this.cliente.Mail,
         TipoDoc: this.cliente.TipoDoc,
         NroDoc: this.cliente.NroDoc,
         CondicionIVA: this.cliente.CondicionIVA,
         Estado: this.cliente.Estado

      })  
   }

   save(){
      if (this.xForm.valid && !this.showMailError && !this.showNameError) {
         this.waitingMsg = "Guardando cliente ..."
         this.currentView = 0;
         this.cliente.Fantasia = this.xForm.get("Fantasia").value;
         this.cliente.Cliente = this.xForm.get("Cliente").value;
         this.cliente.Calle = this.xForm.get("Calle").value;
         this.cliente.CodPos = this.xForm.get("CodPos").value;
         this.cliente.Ciudad = this.xForm.get("Ciudad").value;
         this.cliente.Provincia = this.xForm.get("Provincia").value;
         this.cliente.Telefono = this.xForm.get("Telefono").value;
         this.cliente.Mail = this.xForm.get("Mail").value;
         this.cliente.TipoDoc = this.xForm.get("TipoDoc").value;
         this.cliente.NroDoc = this.xForm.get("NroDoc").value;
         this.cliente.CondicionIVA = this.xForm.get("CondicionIVA").value;
         this.cliente.Estado = (this.xForm.get("Estado").value) ? 1 : 0;
         this.ds.saveCliente(this.cliente).subscribe( 
            data => {
               this.getData();
            },
            error => {
               this.globals.showError("clientes", `savecliente(${this.cliente.Id})`, error);
               this.currentView = 3;
            }
         );
      }
   }

   cancel(){
      this.currentView = 2;
   }
   eliminar(){
      this.cliente = null;
      this.waitingMsg = "Eliminando la cliente ..."
      this.currentView = 0;
      this.ds.deleteCliente(this.rowSelected.Id)
         .subscribe( 
            data => {
               this.clientes = this.clientes.filter( cliente => cliente.Id != this.rowSelected.Id);
               this.rowSelected = null;
               this.currentView = 2;
            },
            error => {
               this.globals.showError("clientes", `deletecliente(${this.rowSelected.Id})`, error);
               this.currentView = 2;
            }
         );
   }
   
   toolbarButtonClicked(event) {
      try {
         if (event['callbackParam']) {
            this[event['callbackFn']](event['callbackParam']);
         }
         else {
            this[event['callbackFn']]();
         }
      }
      catch{
         console.log("Callback with param error : " + 
                     event['callbackFn'] + ' Param : ' + 
                     event['callbackParam']
         );
      }
   }

   gotoHome() {
      this.router.navigate(['home'])
   }

   validateEmail( ){
      let mail = this.xForm.get("Mail").value;
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.showMailError = ! re.test(mail);
   }
   validateNameLength( ){
      let name = this.xForm.get("Cliente").value;
      this.showNameError = (name.length < 10);
   }

   compareFn(e1: any, e2: any): boolean {
      return e1 && e2 ? e1.Id === e2.Id : e1 === e2; 
   }

   ngOnDestroy() {
      if (this.sbs_TiposDoc){
         this.sbs_TiposDoc.unsubscribe();
      }
      if (this.sbs_CondicionesIVA){
         this.sbs_CondicionesIVA.unsubscribe();
      }
   }


}



