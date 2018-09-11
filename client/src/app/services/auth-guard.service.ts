import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
   providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

   constructor(
      private us: UserService,
      private router: Router) {

   }

   canActivate(): boolean {
      if (!this.us.isUserAdmin()) {
         this.router.navigate(['home']);
         return false;
      }
      return true;
   }
}