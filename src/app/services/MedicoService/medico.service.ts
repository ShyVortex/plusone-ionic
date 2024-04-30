import { Injectable } from '@angular/core';
import {Paziente} from "../../models/paziente/Paziente";
import {Observable, Observer} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Medico} from "../../models/medico/Medico";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private medicoURL = "http://localhost:8080/api/medici"

  constructor() {

  }

  getAllMedici(): Observable<Medico[]> {

    let jsonResponse: any[] = [];
    let medici: Medico[] = [];

    return new Observable<Medico[]>((observer: Observer<Medico[]>) => {
      axios.get<Medico[]>(this.medicoURL + "/getAll").then
      ((response: AxiosResponse<Medico[]>) => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          medici.push(ModelUtilities.medicoFromJSON(element))
        })
        console.log(medici)

        observer.next(medici);
        observer.complete();
      })
        .catch(error => {
            console.log(error)
          }
        );
    });
  }
  getMedicoByEmail(email:string) : Observable<Medico> {
    let jsonResponse:any;
    let medico:Medico;

    return new Observable<Medico>((observer:Observer<Medico>)  => {
      axios.get<Medico>(this.medicoURL +"/GetMedicoByEmail/" + email).then
      ((response:AxiosResponse<Medico>)  => {
        jsonResponse = response.data
        medico = ModelUtilities.medicoFromJSON(jsonResponse);
        observer.next(medico);
        observer.complete();
      })
        .catch(error => {console.log(error)}
        );
    });
  }
}
