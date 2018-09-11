export interface IUserRole 
   {
      "id": number;
      "userRole": string;
   }

export interface IUser 
   {
      "id": number;
      "name": string;
      "userRole": IUserRole;
   }

export interface ITipoDoc 
   {
      "Id": number;
      "Codigo": number;
      "Documento": string;
      "Estado": number;
   }

export interface ICondicionIVA
   {
      "Id": number;
      "Codigo": number;
      "CondicionIVA": string;
      "Estado": number;
   }

export interface ICliente 
   {
      "Id": number;
      "Fantasia": string;
      "Cliente": string; 
      "Calle": string;
      "CodPos": string;
      "Ciudad": string;
      "Provincia": string;
      "Telefono": string;
      "Mail": string;
      "TipoDoc": ITipoDoc;
      "NroDoc": string;
      "CondicionIVA": ICondicionIVA;
      "Estado": number;
   }

export interface IPageTitle {
   "title": string;
   "waitingmessage": string;
}