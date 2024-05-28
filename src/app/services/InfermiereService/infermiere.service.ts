import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Infermiere} from "../../models/infermiere/Infermiere";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Sesso} from "../../models/persona/sesso";

@Injectable({
  providedIn: 'root'
})

export class InfermiereService {
  private infermiereURL = "http://localhost:8080/api/infermieri";

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
      if (!infermiere.isEmpty())
        infermiere.setState(true);
      observer.next(infermiere);
      observer.complete();
      })

      .catch(error => {console.log(error)}
      );
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
  }
}
