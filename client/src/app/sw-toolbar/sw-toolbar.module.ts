import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonToggleModule,
         MatTooltipModule, 
         MatIconModule,
         MatMenuModule,
         MatDividerModule } from '@angular/material';

import { SwToolbarComponent } from './sw-toolbar.component';

@NgModule({
   imports: [
      CommonModule,
      MatButtonToggleModule,
      MatTooltipModule,
      MatIconModule,
      MatMenuModule,
      MatDividerModule,
   ],
   declarations: [
      SwToolbarComponent
   ],
   exports: [
      SwToolbarComponent,
   ]
})
export class SwToolbarModule { }
