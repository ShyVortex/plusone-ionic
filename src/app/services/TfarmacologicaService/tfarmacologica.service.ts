import { Injectable } from '@angular/core';
import {Terapia} from "../../models/terapia/Terapia";
import {Observable, Observer} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Paziente} from "../../models/paziente/Paziente";
import {Esame} from "../../models/esame/Esame";
import {QuantitaDettaglio} from "../../models/terapiafarmacologica/QuantitaDettaglio";
import {TerapiaFarmacologica} from "../../models/terapiafarmacologica/TerapiaFarmacologica";
import {isEqual} from "lodash";

@Injectable({
  providedIn: 'root'
})

export class TfarmacologicaService {
  private baseURL: string = "https://plusone-backend-8nmk.onrender.com/api/";
  private tFarmacologicaURL: string = this.baseURL + "medici";

  constructor() { }

  addTFarmacologica(id_medico:number,id_paziente:number):Observable<any> {

    return new Observable<any>((observer:Observer<any>)  => {
      axios.post<any>(this.tFarmacologicaURL +"/addTfarmacologica" +"/"+id_medico + "/" + id_paziente).then
      ((response:AxiosResponse<any>)  => {
        observer.next(response.data.id)
        observer.complete();
      })
        .catch(error => {console.log(error)

          }
        );
    });
  }

  deleteTfarmacologica(id:number) : Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      axios.delete<void>(this.tFarmacologicaURL + "/deleteTfarmacologica"+"/" + id).then
      ((response: AxiosResponse<void>) => {
        observer.next()
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }

  getAllEsamiByTFarmacologica(id:number): Observable<Esame[]> {
    let jsonResponse: any[] = [];
    let esami: Esame[] = [];

    return new Observable<Esame[]>((observer:Observer<Esame[]>)  => {
      axios.get<Esame[]>(this.tFarmacologicaURL +"/getAllEsamiOfTfarmacologica" + "/" + id).then
      ((response:AxiosResponse<Esame[]>)  => {
        esami = []
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          esami.push(ModelUtilities.esameFromJSON(element))
        })
        console.log(esami)

        observer.next(esami);
        observer.complete();
      })
        .catch(error => {console.log(error)
            observer.next([])
          }
        );
    });
  }

  getAllQuantitaDettaglioByTFarmacologica(id:number): Observable<QuantitaDettaglio[]> {

    let jsonResponse: any[] = [];
    let quantitaDettagli: QuantitaDettaglio[] = [];

    return new Observable<QuantitaDettaglio[]>((observer:Observer<QuantitaDettaglio[]>)  => {
      axios.get<QuantitaDettaglio[]>(this.tFarmacologicaURL +"/getAllQuantitaDettaglioByTFarmacologica" + "/" + id).then
      ((response:AxiosResponse<QuantitaDettaglio[]>)  => {
        quantitaDettagli = []
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          quantitaDettagli.push(ModelUtilities.quantitaDettaglioFromJSON(element))
        })
        console.log(quantitaDettagli)

        observer.next(quantitaDettagli);
        observer.complete();
      })
        .catch(error => {console.log(error)
            observer.next([])
          }
        );
    });
  }

  addEsameToTfarmacologica(id_esame:number,id_tfarmacologica:number): Observable<void> {
      return new Observable<any>((observer:Observer<void>)  => {
        axios.put<void>(this.tFarmacologicaURL +"/addEsameToTfarmacologica" +"/"+id_esame + "/" + id_tfarmacologica).then
        ((response:AxiosResponse<void>)  => {
          observer.next()
          observer.complete();
        })
          .catch(error => {console.log(error)

            }
          );
      });
  }

  removeEsameOfTfarmacologica(id_esame:number,id_tfarmacologica:number): Observable<void> {
    return new Observable<any>((observer:Observer<void>)  => {
      axios.put<void>(this.tFarmacologicaURL +"/removeEsameOfTfarmacologica" +"/"+id_esame + "/" + id_tfarmacologica).then
      ((response:AxiosResponse<any>)  => {
        observer.next()
        observer.complete();
      })
        .catch(error => {console.log(error)

          }
        );
    });
  }

  setState(id_tFarmacologica:number,stato:boolean):Observable<any> {

    return new Observable<any>((observer:Observer<any>)  => {
      axios.put<any>(this.tFarmacologicaURL +"/setState" +"/"+id_tFarmacologica + "/" + stato).then
      ((response:AxiosResponse<any>)  => {
        observer.next(response.data)
        observer.complete();
      })
        .catch(error => {console.log(error)

          }
        );
    });
  }

  addTFarmacologicaOffline(paziente: Paziente, tFarmacologica: TerapiaFarmacologica) {
    paziente.tFarmacologiche.push(tFarmacologica);
  }

  deleteTFarmacologicaOffline(paziente: Paziente, tFarmacologica: TerapiaFarmacologica) {
    const index = paziente.tFarmacologiche.findIndex(item => item === tFarmacologica);
    if (index !== -1) {
      if (isEqual(tFarmacologica, paziente.tFarmacologiche[index])) {
        paziente.tFarmacologiche.splice(index, 1);
        console.log("Prescription has been cancelled.")
      }
    }
    else
      console.error("Prescription not found");
  }
}
