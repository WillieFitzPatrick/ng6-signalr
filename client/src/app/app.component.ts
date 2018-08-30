import { Component } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent {
   title = 'app';
   private _hubConnection: HubConnection | undefined;
   public async: any;
   message = '';
   messages: string[] = [];

   constructor() {
   }

   public sendMessage(): void {
      const data = `Sent: ${this.message}`;

      if (this._hubConnection) {
         this._hubConnection.invoke('Send', data);
      }
      this.messages.push(data);
   }

   ngOnInit() {
      this._hubConnection = new signalR.HubConnectionBuilder()
         .withUrl('http://localhost:4040/cacheHub')
         .configureLogging(signalR.LogLevel.Information)
         .build();

      this._hubConnection.start().catch(err => console.error(err.toString()));

      this._hubConnection.on('Send', (data: any) => {
         const received = `Received: ${data}`;
         this.messages.push(received);
      });
   }

}
