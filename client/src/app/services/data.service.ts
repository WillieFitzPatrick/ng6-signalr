import { Injectable } from '@angular/core';
import { ICliente } from  '../models/models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalsService } from './globals.service';
 

@Injectable({
   providedIn: 'root'
})
export class DataService {

   constructor( private http: HttpClient,
                private globals: GlobalsService) { }

   getClientes(): Observable<ICliente[]> {
      return this.http.get<ICliente[]>( this.globals.url() + "clientes", { headers: this.globals.getAuthHeaders() })
   }

   getCliente(id: number): Observable<ICliente> {
      return this.http.get<ICliente>( this.globals.url() + "clientes/" + id, { headers: this.globals.getAuthHeaders() })
   }
   saveCliente(cliente: ICliente) {
      if (cliente.Id == 0){
         return this.http.post( this.globals.url() + "clientes", JSON.stringify(cliente), { headers: this.globals.getAuthHeaders() })
      }
      else {
         return this.http.put( this.globals.url() + "clientes/" + cliente.Id, JSON.stringify(cliente), { headers: this.globals.getAuthHeaders() })
      }
   }
   deleteCliente(id: number) {
         return this.http.delete( this.globals.url() + "clientes/" + id, { headers: this.globals.getAuthHeaders() })
   }

}

