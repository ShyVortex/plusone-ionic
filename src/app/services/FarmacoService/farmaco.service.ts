import { Injectable } from '@angular/core';
import { StorageService } from '../StorageService/storage.service';
import { Observable, Observer } from 'rxjs';
import { ModelUtilities } from 'src/app/models/ModelUtilities';
import axios, { AxiosResponse } from 'axios';
import { Farmaco } from 'src/app/models/farmaco/Farmaco';

@Injectable({
  providedIn: 'root'
})
export class FarmacoService {
  private baseURL: string = "https://plusone-backend-8nmk.onrender.com/api/";
  private farmacoURL = this.baseURL + "farmaci";

  constructor(
    private storageService: StorageService
  ) {}

  getAllFarmaci() {
    let jsonResponse: any[] = [];
    let farmaci: Farmaco[] = [];

    return new Observable<Farmaco[]>((observer: Observer<Farmaco[]>) => {
      axios.get<Farmaco[]>(this.farmacoURL + "/getAll").then
      ((response: AxiosResponse<Farmaco[]>) => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          farmaci.push(ModelUtilities.farmacoFromJSON(element))
        })
        console.log(farmaci)

        observer.next(farmaci);
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }
}
