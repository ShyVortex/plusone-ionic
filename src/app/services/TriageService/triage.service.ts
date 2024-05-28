import { Injectable } from '@angular/core';
import {Paziente} from "../../models/paziente/Paziente";
import {Triage} from "../../models/triage/Triage";
import {Observable, Observer} from "rxjs";
import {Terapia} from "../../models/terapia/Terapia";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Conferma} from "../../models/triage/Conferma";

@Injectable({
  providedIn: 'root'
})

export class TriageService {
  private triageURL = "http://localhost:8080/api/triage";

  constructor() {
  }

  addRichiestaOffline(paziente: Paziente, richiesta: Triage) {
    paziente.richieste.push(richiesta);
  }

  getAllTriages(): Observable<Triage[]> {


    let jsonResponse: any[] = [];
    let richieste: Triage[] = [];

    return new Observable<Triage[]>((observer: Observer<Triage[]>) => {
      axios.get<Triage[]>(this.triageURL + "/getAllTriage").then
      ((response: AxiosResponse<Triage[]>) => {
        jsonResponse = response.data
        richieste = []
        jsonResponse.forEach((element: any) => {
          richieste.push(ModelUtilities.triageFromJSON(element))
        })
        console.log(richieste)

        observer.next(richieste);
        observer.complete();
      })
        .catch(error => {
            console.log(error)
          }
        );
    });
  }

  addTriage(id_paziente: number, triage: any): Observable<Triage> {
    let jsonResponse: any
    let triageAdded: Triage = new Triage();

    return new Observable<Triage>((observer: Observer<Triage>) => {
      axios.post<Triage>(this.triageURL + "/addTriage" + "/" + id_paziente, triage).then
      ((response: AxiosResponse<Triage>) => {
        jsonResponse = response.data
        triageAdded = ModelUtilities.triageFromJSON(jsonResponse);


        observer.next(triageAdded);
        observer.complete();
      })
        .catch(error => {
            console.log(error)

          }
        );
    });
  }

setState(id_triage: number,conferma :Conferma): Observable<Triage> {
  let jsonResponse: any
  let triageModified: Triage = new Triage();

  return new Observable<Triage>((observer: Observer<Triage>) => {
    axios.put<Triage>(this.triageURL + "/setState" + "/" + id_triage + "/"+ conferma).then
    ((response: AxiosResponse<Triage>) => {
      jsonResponse = response.data
      triageModified = ModelUtilities.triageFromJSON(jsonResponse);


      observer.next(triageModified);
      observer.complete();
    })
      .catch(error => {
          console.log(error)

        }
      );
  });
}
}
