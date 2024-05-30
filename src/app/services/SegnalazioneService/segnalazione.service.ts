import { Injectable } from '@angular/core';
import {Segnalazione} from "../../models/segnalazione/Segnalazione";
import {cloneDeep, isEqual} from "lodash";
import {StorageService} from "../StorageService/storage.service";

@Injectable({
  providedIn: 'root'
})

export class SegnalazioneService {

  constructor(
    private storageService: StorageService
  ) {}

  addSegnalazioneOffline(persona: any, segnalazione: Segnalazione) {
    persona.segnalazioni.push(segnalazione);
    this.storageService.cacheSegnalazione(segnalazione);
  }

  deleteSegnalazioneOffline(persona: any, segnalazione: Segnalazione) {
    const index = persona.segnalazioni.findIndex((item: Segnalazione) => item === segnalazione);
    if (index !== -1) {
      if (isEqual(persona.segnalazioni[index], segnalazione)) {
        // splice === rimuovi
        persona.segnalazioni.splice(index, 1);
        console.log(`Report for ${segnalazione.schermata} by ${persona.nome} ${persona.cognome}
        has been cancelled.`);
      }
      else
        console.error('The report details do not match.');
    }
    else
      console.error('Report not found.');
  }
}
