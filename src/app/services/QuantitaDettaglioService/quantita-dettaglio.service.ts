import { Injectable } from '@angular/core';
import {Terapia} from "../../models/terapia/Terapia";
import {Observable, Observer} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {QuantitaDettaglio} from "../../models/terapiafarmacologica/QuantitaDettaglio";

@Injectable({
  providedIn: 'root'
})
export class QuantitaDettaglioService {
  private quantitaDettaglioURL = "http://localhost:8080/api/medici";

  constructor() { }
  addQuantitaDettaglio(id_farmaco:number,id_tFarmacologica:number,quantitaDettaglio:QuantitaDettaglio):Observable<QuantitaDettaglio> {
    let jsonResponse :any
    let quantitaDettaglioAdded:QuantitaDettaglio = new QuantitaDettaglio();

    return new Observable<QuantitaDettaglio>((observer:Observer<QuantitaDettaglio>)  => {
      axios.post<Terapia>(this.quantitaDettaglioURL +"/addQuantitaDettaglio" +"/"+id_farmaco + "/" + id_tFarmacologica,quantitaDettaglio).then
      ((response:AxiosResponse<Terapia>)  => {
        jsonResponse = response.data
        quantitaDettaglioAdded = ModelUtilities.quantitaDettaglioFromJSON(jsonResponse);


        observer.next(quantitaDettaglioAdded);
        observer.complete();
      })
        .catch(error => {console.log(error)

          }
        );
    });
  }
}
