import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { Esame } from 'src/app/models/esame/Esame';
import { ModelUtilities } from 'src/app/models/ModelUtilities';

@Injectable({
  providedIn: 'root'
})
export class EsameService {
  private commonURL = "http://localhost:8080/api/esami";

  constructor() { }

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
}
