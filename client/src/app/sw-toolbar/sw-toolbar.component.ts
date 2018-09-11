import {Component, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'sw-toolbar',
  templateUrl: './sw-toolbar.component.html',
  styleUrls: ['./sw-toolbar.component.scss']
})

export class SwToolbarComponent implements OnInit, OnDestroy {
@Input("toolbar") toolbar: any;
@Input("value") value: string;
@Output('onButtonClicked')
   datasubmit: EventEmitter<object> = new EventEmitter<object>();

   watcher: Subscription;
   activeMediaQuery = "";
   showButtonGroup: boolean = true;
   toolTip: string = "";
   constructor(private media: ObservableMedia) {

   }

   ngOnInit() {
      let _mode = ( this.toolbar['mode'] || 'buttonGroup');
      this.watcher = this.media.subscribe((change: MediaChange) => {
         this.showButtonGroup = !(change.mqAlias == 'sm' || change.mqAlias == 'xs') && (_mode ==='buttonGroup');
      });
   }

   ngOnDestroy() {
      this.watcher.unsubscribe();
   }

   callbackFn( button ) {
      if (button.callbackFn) {
         if (button.callbackParam) {
            this.datasubmit.emit({"callbackFn":button.callbackFn,"callbackParam":button.callbackParam});
         }
         else {
            this.datasubmit.emit({"callbackFn":button.callbackFn});
         }
      }

   }


}