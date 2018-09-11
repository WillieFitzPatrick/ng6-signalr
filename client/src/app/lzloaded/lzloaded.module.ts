import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { LzloadedRoutingModule } from './lzloaded-routing.module';
import { LzcomponentComponent } from './lzcomponent/lzcomponent.component';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      LzloadedRoutingModule
   ],
   declarations: [
      LzcomponentComponent
   ]
})
export class LzloadedModule { }
