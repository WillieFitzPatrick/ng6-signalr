import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ITipoDoc, ICondicionIVA } from '../models/models';
import { PageTitleService } from './page-title.service';

// const _serverUrl: string = "http://localhost:4040/";
const _serverUrl: string = "https://sistemasw.com.ar/gestionb/server/";

const cmpNewWindow: string = "_blank";
const cmpNewWindowFeatures: string = "location=yes,height=700,width=800,scrollbars=yes,status=yes";


export const TOKEN_NAME: string = 'gnliquidaciones_token';

@Injectable({
   providedIn: 'root'
})
export class GlobalsService {
   private token: string = "";

   public TiposDoc: BehaviorSubject<ITipoDoc[]> = new BehaviorSubject([]);
   public CondicionesIVA: BehaviorSubject<ICondicionIVA[]> = new BehaviorSubject([]);

   private cache = 
      {"TiposDoc": null,
       "CondicionesIVA": null
      };

   constructor( private http: HttpClient,
                private pts: PageTitleService ) {
      this.LoadFromLocalStorage("TiposDoc");
      this.TiposDoc.next( this.cache.TiposDoc);
      
      this.LoadFromLocalStorage("CondicionesIVA");
      this.CondicionesIVA.next( this.cache.CondicionesIVA);
   }

   LoadFromLocalStorage( cacheName ) {
      let tmpCache = localStorage.getItem(cacheName) || null;
      if (tmpCache) {
         try {
            this.cache[cacheName] = JSON.parse(tmpCache);
         }
         catch {
            this.cache[cacheName] = {};
         }
      }
   }

   SaveToLocalStorage( cacheName ) {
      localStorage.setItem(cacheName, JSON.stringify( this.cache[cacheName] ));
   }

   InitCache( cache?: string){
      let start: number =  Date.now();
      this.pts.setWaitingMessage("Loading fixed data from server...");
      let callsFinished: number = 0;
      const totalCalls: number = 1;

      // Call : 1
      this.http.get<ITipoDoc[]>(
         this.url() + 'tiposdoc',
         { headers: this.getAuthHeaders() }
      ).subscribe(
         data => {
            console.log("TiposDoc cache initialized. time elapsed : ", Math.abs( (Date.now() - start)/1000), " seconds.",callsFinished);
            this.cache.TiposDoc = data;
            this.SaveToLocalStorage("TiposDoc");
            this.TiposDoc.next( this.cache.TiposDoc);
            if (callsFinished++ == totalCalls) this.pts.setWaitingMessage();
         } 
      )

      // Call : 2
      this.http.get<ICondicionIVA[]>(
         this.url() + 'condicionesiva',
         { headers: this.getAuthHeaders() }
      ).subscribe(
         data => {
            console.log("CondicionesIVA cache initialized. time elapsed : ", Math.abs( (Date.now() - start)/1000), " seconds.",callsFinished);
            this.cache.CondicionesIVA = data;
            this.SaveToLocalStorage("CondicionesIVA");
            if (callsFinished++ == totalCalls) this.pts.setWaitingMessage();
            this.CondicionesIVA.next( this.cache.CondicionesIVA);

         } 
      )
   }

   url() {
      return _serverUrl + 'api/';
   }
   hubUrl() {
      return _serverUrl;
   }

   getAuthHeaders() {
      // if (this.token == "") {
      //    const _tmpToken = localStorage.getItem(TOKEN_NAME)
      //    if (_tmpToken) {
      //       this.token = _tmpToken
      //    }
      //    else {
      //       alert("No Token !!!!");
      //    }
      // }

      const headers = new HttpHeaders().set('Content-Type', 'application/json')
         .set('Accept', 'application/json')
         //.set('Authorization', 'Bearer ' + this.token);

      return headers;
   }


   //Used when user really logsin and receives an access token

   // readToken(): string {
   //    this.token = localStorage.getItem(TOKEN_NAME);
   //    return this.token;
   // }

   // getToken(): string {
   //    return this.token;
   // }

   // setToken(token: string): void {
   //    this.token = token;
   //    if (token) {
   //       localStorage.setItem(TOKEN_NAME, token);
   //       this.userData = this.getTokenPayload();
   //    }
   //    else {
   //       localStorage.removeItem(TOKEN_NAME);
   //       this.userData = null;
   //    }
   //    this.UserLoggedIn.next(this.userData);
   // }

   // getTokenExpirationDate(token: string): Date {
   //    const decoded = jwt_decode(token);

   //    if (decoded.exp === undefined) return null;

   //    const date = new Date(0);
   //    date.setUTCSeconds(decoded.exp);
   //    return date;
   // }

   // getTokenPayload(): IUserData {
   //    const decoded = jwt_decode(this.getToken());
   //    // lugarestrabajo is a string, need to transform it in array of objects
   //    const _tmplt = JSON.parse(decoded.lugarestrabajo.toString());
   //    const _tmpct = JSON.parse(decoded.contratos.toString());
      
   //    let usuariolugarestrabajo = [];
   //    _tmplt.forEach(
   //       el => usuariolugarestrabajo.push( el )
   //    )

   //    let usuariocontratos = [];
   //    _tmpct.forEach(
   //       el => usuariocontratos.push( el )
   //    )
   //    return {
   //       "Id": decoded.nameid,
   //       "Usuario": decoded.usuario,
   //       "ApeyNom": decoded.apeynom,
   //       "Email": decoded.email,
   //       "Nivel": decoded.nivel,
   //       "LugaresTrabajo": usuariolugarestrabajo,
   //       "Contratos": usuariocontratos,
   //    };

   // }

   // isTokenExpired(token?: string): boolean {
   //    if (!token) token = this.getToken();
   //    if (!token) return true;

   //    const date = this.getTokenExpirationDate(token);
   //    if (date === undefined) return false;
   //    return !(date.valueOf() > new Date().valueOf());
   // }

   // isUserLoggedIn(): boolean {
   //    return (this.userData && this.userData.Id > 0 && !this.isTokenExpired(this.getToken()));
   // }

   // isUserAdmin(): boolean {
   //    return (this.userData.Nivel == 1);
   // }

   isNull(data: any, ret: any) {
      return (data == null) ? ret : data;
   }
   isEmpty(data: string, ret: string) {
      return (data === "") ? ret : data;
   }
   toDate(sFecha) {
      const _fecha: string = new Date(sFecha).toUTCString();
      return _fecha;
   }

   fromDate(_date: Date) {
      return new Date(_date).toISOString().split('T')[0]
   }

   daysInMonth(iMonth, iYear) {
      if (iMonth === 0) {
         iMonth = 12;
         iYear = iYear - 1;
      }
      return 32 - new Date(iYear, iMonth-1, 32).getDate();
   }

   dayOfWeek(dia: number, mes: number, anio: number ): number {
      let d = new Date( anio, mes-1, dia );
      return d.getDay();
   }

   nombreDia(dia: number, mes: number, anio: number ): string {
      let d = new Date( anio, mes-1, dia );
      let nombres = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado']
      return nombres[d.getDay()];
   }

   nombreMes( mes: number ): string  {
      let nombres = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
      return nombres[mes-1];
   }

   showError(entity, method, error) {
      console.log(`${entity} : Error in method ${method} => ${error.error}`)
   }



}

