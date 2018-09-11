import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser, IUserRole } from '../models/models';

@Injectable({
   providedIn: 'root'
})

export class UserService {
   private _isUserAdmin: boolean = false;
   actualUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({ "id": 0, "name": "", "userRole": { "id": 0, "userRole": "" } });

   constructor() { }

   isUserAdmin(): boolean {
      return this._isUserAdmin;
   }

   setUser(user: IUser): void {
      this.actualUser.next(user)
      this._isUserAdmin = user.userRole.userRole.toLowerCase() == "admin";
   }
}

