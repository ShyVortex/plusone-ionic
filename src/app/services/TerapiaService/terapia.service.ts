import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Paziente} from "../../models/paziente/Paziente";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Terapia} from "../../models/terapia/Terapia";
import {Medico} from "../../models/medico/Medico";
import {isEqual} from "lodash";

@Injectable({
  providedIn: 'root'
})

export class TerapiaService {
  private terapiaURL = "http://localhost:8080/api/terapie";

  constructor() { }

  getAllTerapie():Observable<Terapia[]> {
    let jsonResponse :any[] =[];
    let terapie:Terapia[] = [];

    return new Observable<Terapia[]>((observer:Observer<Terapia[]>)  => {
      axios.get<Terapia[]>(this.terapiaURL +"/getAll").then
      ((response:AxiosResponse<Terapia[]>)  => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          terapie.push(ModelUtilities.terapieFromJSON(element))
        })
        console.log(terapie)

        observer.next(terapie);
        observer.complete();
      })
        .catch(error => {console.log(error)}
        );
    });
  }

  getTerapieByTipologiaTerapia(tipologia: String):Observable<Terapia[]> {
    let jsonResponse :any[] =[];
    let terapie:Terapia[] = [];

    return new Observable<Terapia[]>((observer:Observer<Terapia[]>)  => {
      axios.get<Terapia[]>(this.terapiaURL +"/getTerapieByTipologiaTerapia/" + tipologia).then
      ((response:AxiosResponse<Terapia[]>)  => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          terapie.push(ModelUtilities.terapieFromJSON(element))
        })
        console.log("Terapie filtrate per tipo", terapie)

        observer.next(terapie);
        observer.complete();
      })
        .catch(error => {console.log(error)}
        );
    });
  }

  addTerapia(id_medico:number,id_paziente:number,terapia:Terapia):Observable<Terapia> {
    let jsonResponse :any
    let terapiaAdded:Terapia = new Terapia();

    return new Observable<Terapia>((observer:Observer<Terapia>)  => {
      axios.post<Terapia>(this.terapiaURL +"/addTerapia" +"/"+id_medico + "/" + id_paziente,terapia).then
      ((response:AxiosResponse<Terapia>)  => {
        jsonResponse = response.data
        terapiaAdded = ModelUtilities.terapieFromJSON(jsonResponse);


        observer.next(terapiaAdded);
        observer.complete();
      })
        .catch(error => {console.log(error)

        }
        );
    });
  }
  setState(id:number, state:boolean):Observable<any> {
    return new Observable<any>((observer:Observer<any>)  => {
      axios.put<any>(this.terapiaURL +"/setState" +"/"+id + "/" + state).then
      ((response:AxiosResponse<any>)  => {

        observer.next(response.data);
        observer.complete();
      })
        .catch(error => {console.log(error)

          }
        );
    });
  }
  deleteTerapia(id:number):Observable<void> {
    return new Observable<void>((observer:Observer<void>)  => {
      axios.delete<void>(this.terapiaURL +"/deleteTerapia" +"/"+id ).then
      ((response:AxiosResponse<void>)  => {

        observer.next();
        observer.complete();
      })
        .catch(error => {console.log(error)

          }
        );
    });
  }

  addTerapiaOffline(paziente: Paziente, medico: Medico, terapia: Terapia) {
    paziente.terapie.push(terapia);
    medico.terapie.push(terapia);
  }

  updateTerapiaOffline(paziente: Paziente, terapia: Terapia) {
    const index = paziente.terapie.findIndex(item => item === terapia);
    if (index !== -1) {
      if (isEqual(paziente.terapie[index], terapia)) {
        paziente.terapie[index].attivo = true;
      }
    }
    else
      console.error("CRITICAL ERROR: prenotazione not found in paziente: " + paziente);
  }

  deleteTerapiaOffline(paziente: Paziente, terapia: Terapia) {
    const index = paziente.terapie.findIndex(item => item === terapia);
    if (index !== -1) {
      if (isEqual(paziente.terapie[index], terapia)) {
        paziente.terapie.splice(index, 1);
      }
    }
    else
      console.error("CRITICAL ERROR: prenotazione not found in paziente: " + paziente);
  }

}
