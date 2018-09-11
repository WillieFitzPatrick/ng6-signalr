import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { AdminComponent } from './admin/admin.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { AttrBindingsComponent } from './attr-bindings/attr-bindings.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
   { path: '', component: LoginComponent },
   { path: 'login', component: LoginComponent },
   { path: 'home', component: HomeComponent },
   { path: 'customers', component: CustomersComponent },
   { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
   { path: 'customercard', component: CustomerCardComponent, children: [
      { path: '', component: CustomerCardComponent, pathMatch: 'full'},
      { path: 'customerlist', component: CustomerListComponent, outlet: 'list' },
      { path: ':id', component: CustomerDataComponent, outlet: 'data' }
    ] },
   { path: 'lzloaded',
     loadChildren: 'app/lzloaded/lzloaded.module#LzloadedModule'  
   },
   { path: 'attrbindings', component: AttrBindingsComponent},
 ];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
