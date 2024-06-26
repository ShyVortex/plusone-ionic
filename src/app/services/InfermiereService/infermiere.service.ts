import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Infermiere} from "../../models/infermiere/Infermiere";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Sesso} from "../../models/persona/sesso";
import {Medico} from "../../models/medico/Medico";

@Injectable({
  providedIn: 'root'
})

export class InfermiereService {
  private baseURL: string = "https://plusone-backend-8nmk.onrender.com/api/";
  private infermiereURL = this.baseURL + "infermieri";

  constructor() {}

  public getAllInfermieri():Observable<Infermiere[]> {
    let jsonResponse: any[] = [];
    let infermieri: Infermiere[] = [];

    return new Observable<Infermiere[]>((observer: Observer<Infermiere[]>) => {
      axios.get<Infermiere[]>(this.infermiereURL + "/getAll").then
      ((response: AxiosResponse<Infermiere[]>) => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          infermieri.push(ModelUtilities.infermiereFromJSON(element))
        })
        console.log(infermieri)
        observer.next(infermieri);
        observer.complete();
        })

        .catch(error => {
          observer.next([])
          console.log(error)
        }
      );
    });
  }

public getInfermiereByEmail(email:string) : Observable<Infermiere> {
  let jsonResponse:any;
  let infermiere:Infermiere;

  return new Observable<Infermiere>((observer:Observer<Infermiere>)  => {
    axios.get<Infermiere>(this.infermiereURL +"/getInfermiereByEmail/" + email).then
    ((response:AxiosResponse<Infermiere>)  => {
      jsonResponse = response.data
      infermiere = ModelUtilities.infermiereFromJSON(jsonResponse);
      observer.next(infermiere);
      observer.complete();
      })

      .catch(error => {console.log(error)}
      );
    });
  }

  updateInfermiere(infermiereToUpdate:Infermiere,id:number) : Observable<Infermiere> {
    let jsonResponse: any;
    let infermiere: Infermiere;

    return new Observable<Infermiere>((observer: Observer<Infermiere>) => {
      axios.put<Infermiere>(this.infermiereURL + "/updateInfermiere"+"/" + id,infermiereToUpdate).then
      ((response: AxiosResponse<Infermiere>) => {
        jsonResponse = response.data
        infermiere = ModelUtilities.infermiereFromJSON(jsonResponse)
        console.log(infermiere)

        observer.next(infermiere);
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }

  deleteInfermiere(id:number) : Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      axios.delete<void>(this.infermiereURL + "/deleteInfermiere"+"/" + id).then
      ((response: AxiosResponse<void>) => {
        observer.next()
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }

  offlineSetInfermiere(infermiere: Infermiere) {
    infermiere.nome = "Teresa";
    infermiere.cognome = "Nucci";
    infermiere.sesso = Sesso.FEMMINA;
    infermiere.email = "teresa.nucci@infermiere.it";
    infermiere.password = "password123";
    infermiere.CF = "NCCTRS81M16B519G";
    infermiere.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
    infermiere.reparto = "Chirurgia";
    infermiere.ruolo = "Infermiere assistente";
    infermiere.setState(false);
  }
}
