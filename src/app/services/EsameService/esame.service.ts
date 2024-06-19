import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { Esame } from 'src/app/models/esame/Esame';
import { ModelUtilities } from 'src/app/models/ModelUtilities';
import {StorageService} from "../StorageService/storage.service";

@Injectable({
  providedIn: 'root'
})
export class EsameService {
  private baseURL: string = "https://plusone-backend-8nmk.onrender.com/api/";
  private commonURL = this.baseURL + "esami";

  constructor(
    private storageService: StorageService
  ) { }

  getAllEsami(): Observable<Esame[]> {
    let jsonResponse: any[] = [];
    let esami: Esame[] = [];

    return new Observable<Esame[]>((observer: Observer<Esame[]>) => {
      axios.get<Esame[]>(this.commonURL + "/getAll").then
      ((response: AxiosResponse<Esame[]>) => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          esami.push(ModelUtilities.esameFromJSON(element))
        })
        console.log(esami);
        observer.next(esami);
        observer.complete();
      }).catch(error => {console.log(error)});
    })
  }

  addEsameOffline(esame: Esame) {
    this.storageService.getEsami().push(esame);
  }
}
