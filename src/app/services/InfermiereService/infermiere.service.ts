import { Injectable } from '@angular/core';
import {Observable, Observer} from "rxjs";
import {Infermiere} from "../../models/infermiere/Infermiere";
import {Medico} from "../../models/medico/Medico";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";

@Injectable({
  providedIn: 'root'
})
export class InfermiereService {
  private infermiereURL = "http://localhost:8080/api/infermieri";

  constructor() {

  }
 public getAllInfermieri():Observable<Infermiere[]> {
  let jsonResponse: any[] = [];
  let infermieri: Infermiere[] = [];

  return new Observable<Infermiere[]>((observer: Observer<Infermiere[]>) => {
  axios.get<Infermiere[]>(this.infermiereURL + "/getAll").then
  ((response: AxiosResponse<Infermiere[]>) => {
  jsonResponse = response.data
  jsonResponse.forEach((element: any) => {
  infermieri.push(ModelUtilities.infermiereFromJSON(element))
})
console.log(infermieri)

observer.next(infermieri);
observer.complete();
})
.catch(error => {
    console.log(error)
  }
);
});
}
public getInfermiereByEmail(email:string) : Observable<Infermiere> {
  let jsonResponse:any;
  let infermiere:Infermiere;

  return new Observable<Infermiere>((observer:Observer<Infermiere>)  => {
    axios.get<Infermiere>(this.infermiereURL +"/GetInfermiereByEmail/" + email).then
    ((response:AxiosResponse<Infermiere>)  => {
      jsonResponse = response.data
      infermiere = ModelUtilities.infermiereFromJSON(jsonResponse);
      if (!infermiere.isEmpty())
        infermiere.setState(true);
      observer.next(infermiere);
      observer.complete();
    })
      .catch(error => {console.log(error)}
      );
  });
}


}
