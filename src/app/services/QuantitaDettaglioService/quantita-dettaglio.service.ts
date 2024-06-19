import { Injectable } from '@angular/core';
import {Terapia} from "../../models/terapia/Terapia";
import {Observable, Observer} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {QuantitaDettaglio} from "../../models/terapiafarmacologica/QuantitaDettaglio";
import {StorageService} from "../StorageService/storage.service";
import {Farmaco} from "../../models/farmaco/Farmaco";

@Injectable({
  providedIn: 'root'
})

export class QuantitaDettaglioService {
  private baseURL: string = "https://plusone-backend-8nmk.onrender.com/api/";
  private quantitaDettaglioURL = this.baseURL + "medici";

  constructor(
    private storageService: StorageService
  ) { }

  addQuantitaDettaglio(id_farmaco: number, id_tFarmacologica: number, quantitaDettaglio: QuantitaDettaglio):Observable<QuantitaDettaglio> {
    let jsonResponse :any
    let quantitaDettaglioAdded: QuantitaDettaglio = new QuantitaDettaglio();

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

  deleteQuantitaDettaglio(id:number) : Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      axios.delete<void>(this.quantitaDettaglioURL + "/deleteQuantitaDettaglio"+"/" + id).then
      ((response: AxiosResponse<void>) => {
        observer.next()
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }

  addQuantitaDettaglioOffline(farmaco: Farmaco, id_tFarmacologica: number, quantita: number, note: string) {
    let quantitaDettaglioAdded: QuantitaDettaglio = new QuantitaDettaglio();

    quantitaDettaglioAdded.quantita = quantita;
    quantitaDettaglioAdded.note = note;
    quantitaDettaglioAdded.id = id_tFarmacologica;
    quantitaDettaglioAdded.farmaco = farmaco;

    this.storageService.getQuantitaDettagli().push(quantitaDettaglioAdded);
  }
}
