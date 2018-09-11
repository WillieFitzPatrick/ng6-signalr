import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PageTitleService } from '../services/page-title.service';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   menu;
   filteredMenu;
   background: string = "white";

   constructor(
      private router: Router,
      private pts: PageTitleService) {
   }

   ngOnInit() {
      this.pts.setTitle("Home");
      this.menu = [
         { "title": "Customers", "icon": "people", "iconcolor": "lightsteelblue", "description": "Shows @Input @Output JS validators", "path": "customers" },
         { "title": "Admin", "icon": "settings", "iconcolor": "darkkhaki", "description": "Restricted Admin Zone - shows canActivate", "path": "admin" },
         { "title": "Lazy", "icon": "cloud_download", "iconcolor": "lightslategray", "description": "Shows Lazy Loaded Module", "path": "/lzloaded" },
         { "title": "Customer Card", "icon": "class", "iconcolor": "pink", "description": "Shows ngContent, routes with parameters, nested router-outlet", "path": "customercard" },
         { "title": "Attribute Bindings", "icon": "code", "iconcolor": "blueviolet", "description": "Shows different attributes bindings and animations", "path": "attrbindings" },
      ]
      this.filteredMenu = this.menu;

   }

   doOpen(path: string) {
      if (path=="customercard"){
         this.router.navigate(['/customercard',{outlets: {'list': ['customerlist'], 'data': ['none']}}]);
      }
      else {
         this.router.navigate([path]);
      }
   }

   getIconColor(item) {
      return item.iconcolor;
   }

   applyFilter(_filter: string) {
      this.filteredMenu = this.menu.filter(el => el.title.toLowerCase().indexOf(_filter.toLowerCase()) != -1);

   }

}
