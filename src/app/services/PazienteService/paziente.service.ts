import { Injectable } from '@angular/core';
import axios , { AxiosResponse } from 'axios';
import { Observable, Observer} from "rxjs";
import {Paziente} from "../../models/paziente/Paziente";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Terapia} from "../../models/Terapia/Terapia";

@Injectable({
  providedIn: 'root'
})
export class PazienteService {
  // Android Studio IP address: 10.0.2.2

  private pazienteURL= "http://localhost:8080/api/pazienti";



  constructor() {}



  getAllPazienti():Observable<Paziente[]> {

    let jsonResponse :any[] =[];
    let pazienti:Paziente[] = [];

    return new Observable<Paziente[]>((observer:Observer<Paziente[]>)  => {
      axios.get<Paziente[]>(this.pazienteURL +"/getAllPazienti").then
      ((response:AxiosResponse<Paziente[]>)  => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          pazienti.push(ModelUtilities.pazienteFromJSON(element))
        })
        console.log(pazienti)

        observer.next(pazienti);
        observer.complete();
      })
        .catch(error => {console.log(error)}
        );
    });
  }

  getPazienteByEmail(email:string):Observable<Paziente> {
    let jsonResponse:any;
    let paziente:Paziente;

    return new Observable<Paziente>((observer:Observer<Paziente>)  => {
      axios.get<Paziente>(this.pazienteURL +"/getPazienteByEmail/" + email).then
      ((response:AxiosResponse<Paziente>)  => {
        jsonResponse = response.data
        paziente = ModelUtilities.pazienteFromJSON(jsonResponse);
        if (!paziente.isEmpty())
          paziente.setState(true);
        console.log(paziente)
        observer.next(paziente);
        observer.complete();
      })
        .catch(error => {console.log(error)
            observer.next(new Paziente())
        }
        );
    });
  }
  addPaziente(paziente:Paziente):Observable<Paziente> {
    let jsonResponse :any
    let pazienteAdded:Paziente = new Paziente();

    return new Observable<Paziente>((observer:Observer<Paziente>)  => {
      axios.post<Paziente>(this.pazienteURL +"/addPaziente" ,paziente).then
      ((response:AxiosResponse<Paziente>)  => {
        jsonResponse = response.data
        pazienteAdded = ModelUtilities.pazienteFromJSON(jsonResponse);


        observer.next(pazienteAdded);
        observer.complete();
      })
        .catch(error => {console.log(error)

          }
        );
    });
  }




}
