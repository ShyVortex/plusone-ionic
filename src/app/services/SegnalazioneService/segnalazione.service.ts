import { Injectable } from '@angular/core';
import {Segnalazione} from "../../models/segnalazione/Segnalazione";
import {cloneDeep, isEqual} from "lodash";
import {StorageService} from "../StorageService/storage.service";
import {Paziente} from "../../models/paziente/Paziente";
import {Observable, Observer} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";

@Injectable({
  providedIn: 'root'
})

export class SegnalazioneService {

  constructor(
    private storageService: StorageService
  ) {}
  private segnalazioneURL: string = "http://localhost:8080/api/segnalazioni";

  addSegnalazioneOffline(persona: any, segnalazione: Segnalazione) {
    persona.segnalazioni.push(segnalazione);
    this.storageService.cacheSegnalazione(segnalazione);
  }

  deleteSegnalazioneOffline(persona: any, segnalazione: Segnalazione) {
    const index = this.storageService.getSegnalazioni().findIndex(
      (item: Segnalazione) => item === segnalazione
    );
    if (index !== -1) {
      if (isEqual(this.storageService.getSegnalazioni()[index], segnalazione)) {
        // splice === rimuovi
        persona.segnalazioni.splice(index, 1); // può fallire se le segnalazioni non si salvano correttamente
        this.storageService.getSegnalazioni().splice(index, 1);
        console.log(`Report for ${segnalazione.schermataBug} by ${segnalazione.utente.nome}
        ${segnalazione.utente.cognome} has been cancelled.`);
      }
      else
        console.error('The report details do not match.');
    }
    else
      console.error('Report not found.');
  }
  addSegnalazione(id_utente:number, segnalazione: Segnalazione):Observable<Segnalazione> {
    let jsonResponse: any
    let segnalazioneAdded: Segnalazione = new Segnalazione();

    return new Observable<Segnalazione>((observer: Observer<Segnalazione>) => {
      axios.post<Segnalazione>(this.segnalazioneURL + "/addSegnalazione" + "/" + id_utente, segnalazione).then
      ((response: AxiosResponse<Segnalazione>) => {
        jsonResponse = response.data
        segnalazioneAdded = ModelUtilities.segnalazioneFromJSON(jsonResponse);


        observer.next(segnalazioneAdded);
        observer.complete();
      })
        .catch(error => {
            console.log(error)

          }
        );
    });
  }
}
