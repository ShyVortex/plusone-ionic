import { Injectable } from '@angular/core';
import axios , { AxiosResponse } from 'axios';
import { Observable, Observer } from "rxjs";
import { Paziente } from "../../models/paziente/Paziente";
import { ModelUtilities } from "../../models/ModelUtilities";
import { Terapia } from "../../models/terapia/Terapia";
import { Medico } from "../../models/medico/Medico";
import { TipologiaMedico } from "../../models/medico/tipologia-medico";
import { Sesso } from "../../models/persona/sesso";

@Injectable({
  providedIn: 'root'
})

export class PazienteService {
  private pazienteURL= "http://localhost:8080/api/pazienti";

  constructor() {}

  getAllPazienti(): Observable<Paziente[]> {
    let jsonResponse: any[] = [];
    let pazienti: Paziente[] = [];

    return new Observable<Paziente[]>((observer:Observer<Paziente[]>)  => {
      axios.get<Paziente[]>(this.pazienteURL +"/getAllPazienti").then
      ((response:AxiosResponse<Paziente[]>)  => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          pazienti.push(ModelUtilities.pazienteFromJSON(element))
        })
        console.log(pazienti)

        observer.next(pazienti);
        observer.complete();
      })
        .catch(error => {console.log(error)}
        );
    });
  }

  getPazienteByEmail(email:string):Observable<Paziente> {
    let jsonResponse:any;
    let paziente:Paziente;

    return new Observable<Paziente>((observer:Observer<Paziente>)  => {
      axios.get<Paziente>(this.pazienteURL +"/getPazienteByEmail/" + email).then
      ((response:AxiosResponse<Paziente>)  => {
        jsonResponse = response.data
        paziente = ModelUtilities.pazienteFromJSON(jsonResponse);
        if (!paziente.isEmpty())
          paziente.setState(true);
        console.log(paziente)
        observer.next(paziente);
        observer.complete();
      })
        .catch(error => {console.log(error)
            observer.next(new Paziente())
        }
        );
    });
  }

  addPaziente(paziente:Paziente):Observable<Paziente> {
    let jsonResponse: any
    let pazienteAdded: Paziente = new Paziente();

    return new Observable<Paziente>((observer: Observer<Paziente>) => {
      axios.post<Paziente>(this.pazienteURL + "/addPaziente", paziente).then
      ((response: AxiosResponse<Paziente>) => {
        jsonResponse = response.data
        pazienteAdded = ModelUtilities.pazienteFromJSON(jsonResponse);


        observer.next(pazienteAdded);
        observer.complete();
      })
        .catch(error => {
            console.log(error)

          }
        );
    });
  }

  offlineSetPaziente(paziente: Paziente) {
    paziente.nome = "Mario";
    paziente.cognome = "Giannini";
    paziente.sesso = Sesso.MASCHIO;
    paziente.email = "mario.giannini@paziente.it";
    paziente.password = "password123";
    paziente.CF = "GNNMRA02R05E335P";
    paziente.indirizzo.cap = "IS";
    paziente.indirizzo.città = "Pesche";
    paziente.indirizzo.via = "Contrada Lappone";
    paziente.esenzione = true;
    paziente.medico = this.offlineSetMedicoCurante();
    paziente.donatoreOrgani = false;
    paziente.attivo = true;
  }

  offlineSetMedicoCurante(): Medico {
    let medico = new Medico();

    medico.isManager = true;
    medico.nome = "Victor";
    medico.cognome = "Conde";
    medico.sesso = Sesso.MASCHIO;
    medico.email = "victor.conde@medico.it";
    medico.password = "password123";
    medico.CF = "CNDVTR85D07E335W";
    medico.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
    medico.reparto = "Cardiologia";
    medico.ruolo = "Primario";
    medico.tipologiaMedico = TipologiaMedico.DI_BASE;

    return medico;
  }
}
