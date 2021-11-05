import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  makeCapitalPopup(data: any): string { 
    return `` +
    `<div>Nom : ${ data.nom }</div>` +
    `<div>Type : ${ data.type_lieu }</div>` +
    `<div>Nombre de bouteilles collectées : ${ data.nb_bouteilles_collectees }</div>`
   }
}
