import { Injectable } from '@angular/core';
import {Paziente} from "../../models/paziente/Paziente";
import {Observable, Observer} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Persona} from "../../models/persona/Persona";

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  private persona: any;
  private personaURL:string = "http://localhost:8080/api/persona";

  constructor() { }

  setPersona(persona: any) {
    this.persona = persona;
  }

  getPersona() {
    return this.persona;
  }
  updatePersonaPassword(id:number,passwordToUpdate:any) : Observable<Persona> {
    let jsonResponse: any;
    let persona: Persona;

    return new Observable<Persona>((observer: Observer<Persona>) => {
      axios.put<Persona>(this.personaURL + "/updatePersonaPassword"+"/" + id,passwordToUpdate).then
      ((response: AxiosResponse<Persona>) => {
        jsonResponse = response.data
        console.log(jsonResponse)

        observer.next(jsonResponse);
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }
}
