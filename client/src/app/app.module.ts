import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
   MatButtonModule,
   MatInputModule,
   MatIconModule,
   MatSidenavModule,
   MatMenuModule,
   MatTabsModule,
   MatChipsModule,
   MatToolbarModule,
   MatListModule,
   MatTableModule,
   MatSelectModule,
   MatCheckboxModule,
   MatSlideToggleModule,
   MatTooltipModule,
   MatProgressSpinnerModule,
   MatProgressBarModule,
   MatCardModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { CustomersComponent } from './customers/customers.component';
import { SwToolbarModule } from './sw-toolbar/sw-toolbar.module';
import { AdminComponent } from './admin/admin.component';
import { CustomerCardComponent } from './customer-card/customer-card.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { AttrBindingsComponent } from './attr-bindings/attr-bindings.component';
import { CustomerListCountComponent } from './customer-list-count/customer-list-count.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageTitleComponent,
    CustomersComponent,
    AdminComponent,
    CustomerCardComponent,
    CustomerListComponent,
    CustomerDataComponent,
    AttrBindingsComponent,
    CustomerListCountComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    FlexLayoutModule,
    SwToolbarModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
