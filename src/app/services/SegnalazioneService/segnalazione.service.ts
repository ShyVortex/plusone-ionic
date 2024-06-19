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
  private baseURL: string = "https://plusone-backend-8nmk.onrender.com/api/";
  private segnalazioneURL: string = this.baseURL + "segnalazioni";

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
  getAllSegnalazioni(): Observable<Segnalazione[]> {
    let jsonResponse: any[] = [];
    let segnalazioni: Segnalazione[] = [];

    return new Observable<Segnalazione[]>((observer:Observer<Segnalazione[]>)  => {
      axios.get<Segnalazione[]>(this.segnalazioneURL +"/getAll").then
      ((response:AxiosResponse<Segnalazione[]>)  => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          segnalazioni.push(ModelUtilities.segnalazioneFromJSON(element))
        })
        console.log(segnalazioni)

        observer.next(segnalazioni);
        observer.complete();
      })
        .catch(error => {console.log(error)
            observer.next([])
          }
        );
    });
  }
  setState(id:number,stato:boolean):Observable<any> {

    return new Observable<any>((observer:Observer<any>)  => {
      axios.put<any>(this.segnalazioneURL +"/setState" +"/"+id + "/" + stato).then
      ((response:AxiosResponse<any>)  => {
        observer.next(response.data)
        observer.complete();
      })
        .catch(error => {console.log(error)

          }
        );
    });
  }
}
