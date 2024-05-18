import { Injectable } from '@angular/core';
import {Paziente} from "../../models/paziente/Paziente";
import {Observable, Observer} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Medico} from "../../models/medico/Medico";
import {Terapia} from "../../models/Terapia/Terapia";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private medicoURL = "http://localhost:8080/api/medici"

  constructor() {}

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
      }).catch(error => {console.log(error)});
    });
  }

  getAllPazientiByMedico(id_medico: number): Observable<Paziente[]> {
    let jsonResponse: any = [];
    let pazienti: Paziente[] = [];

    return new Observable<Paziente[]>((observer: Observer<Paziente[]>) => {
      axios.get<Paziente[]>(this.medicoURL + "/getAllPazientiByMedico" + "/"+ id_medico).then(
        (response: AxiosResponse<Paziente[]>) => {
          jsonResponse = response.data;
          jsonResponse.forEach((element: any) => {
            pazienti.push(ModelUtilities.pazienteFromJSON(element));
          })

          observer.next(pazienti);
          observer.complete();
        }
      ).catch(error => {console.log(error)});
    });
  }

  getMedicoByEmail(email: string) : Observable<Medico> {
    let jsonResponse: any;
    let medico: Medico;

    return new Observable<Medico>((observer: Observer<Medico>)  => {
      axios.get<Medico>(this.medicoURL +"/getMedicoByEmail/" + email).then(
        (response: AxiosResponse<Medico>)  => {
          jsonResponse = response.data;
          medico = ModelUtilities.medicoFromJSON(jsonResponse);

          if (!medico.isEmpty()) {
            medico.setState(true);
          }

          observer.next(medico);
          observer.complete();
        }
      ).catch(error => {console.log(error)});
    });
  }

  addPazienteToMedico(id_medico: number, id_paziente: number) : Observable<Medico> {
    let jsonResponse:any;
    let medico:Medico;

    return new Observable<Medico>((observer:Observer<Medico>)  => {
      axios.put<Medico>(this.medicoURL + "/addPazienteToMedico" + "/" + id_medico + "/" + id_paziente).then(
        (response: AxiosResponse<Medico>)  => {
          jsonResponse = response.data
          medico = ModelUtilities.medicoFromJSON(jsonResponse);

          observer.next(medico);
          observer.complete();
        }
      ).catch(error => {console.log(error)});
    });
  }

  getAllPrenotazioniByMedico(id_medico:number):Observable<Terapia[]> {
    return new Observable<Terapia[]>((observer: Observer<Terapia[]>) => {
      axios.get<Terapia[]>(this.medicoURL + "/getAllPrenotazioniByMedico"+"/"+id_medico).then
      ((response: AxiosResponse<Terapia[]>) => {
        let jsonResponse: any[] = [];
        let terapie: Terapia[] = [];
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          terapie.push(ModelUtilities.terapieFromJSON(element))
        })
        console.log(terapie)

        observer.next(terapie);
        observer.complete();
      })
        .catch(error => {
            console.log(error)
          }
        );
    });
  }
}
