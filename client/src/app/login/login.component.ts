import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IUser, IUserRole } from '../models/models';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { PageTitleService } from '../services/page-title.service';
import { GlobalsService } from '../services/globals.service';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   loginForm: FormGroup;
   loginInProcess: boolean = false;
   loginError: boolean = false;

   private _hubConnection: HubConnection | undefined;
   public async: any;
   connectingToHub: boolean = false;
   message = '';
   messages: string[] = [];

   users: IUser[] = [
      { "id": 1, "name": "admin user", "userRole": {"id":1,"userRole":"admin"} },
      { "id": 2, "name": "regular user", "userRole": {"id":1,"userRole":"user"} }
   ]

   constructor(
         private fb: FormBuilder,
         private router: Router,
         private us: UserService,
         private globals: GlobalsService,
         private pts: PageTitleService) { 

   }

   ngOnInit() {
      this.loginForm = this.fb.group({
         user: [, Validators.required]
      });

      this.loginForm.patchValue( {"user": { "id": 1, "name": "admin user", "userRole": {"id":1,"userRole":"admin"} } })
      
   }
   compareFn(elem1: any, elem2: any): boolean {
      return elem1 && elem2 ? elem1.Id === elem2.Id : elem1 === elem2;
   }

   onLogin(){
      if (this.loginForm.valid) {
         this.loginInProcess= true;
         let _user: IUser = this.loginForm.get("user").value;
         this.us.setUser( _user )
         this.loginInProcess= false;

         //Connect To Hub
         this.connectingToHub = true;
         this._hubConnection = new signalR.HubConnectionBuilder()
         .withUrl( this.globals.hubUrl() + 'cacheHub')
         .configureLogging(signalR.LogLevel.Information)
         .build();

         this._hubConnection.start().catch(err => console.error(err.toString()));

         this._hubConnection.on('cacheUpdate', (data: any) => {
            const received = `cacheUpdate notificacion : Table ${data} updated.`;
            this.pts.setWaitingMessage(received);
            setTimeout( () => this.pts.setWaitingMessage(""),5*1000 );
         });         
         this.globals.InitCache();

         this.router.navigate(['home']);
      }

   }

}
