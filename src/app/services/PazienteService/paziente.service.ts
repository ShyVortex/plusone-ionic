import {Injectable} from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {Observable, Observer} from "rxjs";
import {Paziente} from "../../models/paziente/Paziente";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Medico} from "../../models/medico/Medico";
import {TipologiaMedico} from "../../models/medico/tipologia-medico";
import {Sesso} from "../../models/persona/sesso";
import {Diagnosi} from "../../models/paziente/Diagnosi";
import {Indirizzo} from "../../models/persona/Indirizzo";
import {Terapia} from "../../models/terapia/Terapia";

@Injectable({
  providedIn: 'root'
})

export class PazienteService {
  private baseURL: string = "https://plusone-backend-8nmk.onrender.com/api/";
  private pazienteURL= this.baseURL + "pazienti";

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
        .catch(error => {console.log(error)
        observer.next([])
        }
        );
    });
  }

  getAllPazientiAttivi(): Observable<Paziente[]> {
    let jsonResponse: any[] = [];
    let pazienti: Paziente[] = [];

    return new Observable<Paziente[]>((observer:Observer<Paziente[]>)  => {
      axios.get<Paziente[]>(this.pazienteURL +"/getAllPazientiAttivi").then
      ((response:AxiosResponse<Paziente[]>)  => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          pazienti.push(ModelUtilities.pazienteFromJSON(element))
        })
        console.log(pazienti)

        observer.next(pazienti);
        observer.complete();
      })
        .catch(error => {console.log(error)
            observer.next([])
          }
        );
    });
  }

  getAllPazientiInattivi(): Observable<Paziente[]> {
    let jsonResponse: any[] = [];
    let pazienti: Paziente[] = [];

    return new Observable<Paziente[]>((observer:Observer<Paziente[]>)  => {
      axios.get<Paziente[]>(this.pazienteURL +"/getAllPazientiInattivi").then
      ((response:AxiosResponse<Paziente[]>)  => {
        pazienti = []
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          pazienti.push(ModelUtilities.pazienteFromJSON(element))
        })

        console.log(pazienti)


        observer.next(pazienti);
        observer.complete();
      })
        .catch(error => {console.log(error)
            observer.next([])
          }
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
        console.log(paziente);

        observer.next(paziente);
        observer.complete();
      })
        .catch(error => {console.log(error)
            observer.next(new Paziente())
        }
        );
    });
  }

  getMedicoOfPaziente(id: string): Observable<Medico> {
    let jsonResponse: any;
    let medico: Medico;

    return new Observable<Medico>((observer:Observer<Medico>)  => {
      axios.get<Medico>(this.pazienteURL +"/getMedicoOfPaziente/" + id).then
      ((response: AxiosResponse<Medico>)  => {
        jsonResponse = response.data
        medico = ModelUtilities.medicoFromJSON(jsonResponse);

        console.log(medico)

        observer.next(medico);
        observer.complete();
      })
        .catch(error => {console.log(error)
            observer.next(new Medico())
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

  updatePaziente(pazienteToUpdate:Paziente,id:number) : Observable<Paziente> {
    let jsonResponse: any;
    let paziente: Paziente;

    return new Observable<Paziente>((observer: Observer<Paziente>) => {
      axios.put<Paziente>(this.pazienteURL + "/updatePaziente"+"/" + id,pazienteToUpdate).then
      ((response: AxiosResponse<Paziente>) => {
        jsonResponse = response.data
        paziente = ModelUtilities.pazienteFromJSON(jsonResponse)
        console.log(paziente)

        observer.next(paziente);
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }

  activatePaziente(id: number) : Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      axios.put<Paziente>(this.pazienteURL + "/activatePaziente"+"/" + id).then
      ((response: AxiosResponse<Paziente>) => {
        observer.next()
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }

  deletePaziente(id:number) : Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      axios.delete<void>(this.pazienteURL + "/deletePaziente"+"/" + id).then
      ((response: AxiosResponse<void>) => {
        observer.next()
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }
  getAllPrenotazioniByPaziente(id:number):Observable<Terapia[]> {
    return new Observable<Terapia[]>((observer: Observer<Terapia[]>) => {
      axios.get<Terapia[]>(this.pazienteURL + "/getAllTerapieByPaziente" + "/" + id).then
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
            observer.next([])
            console.log(error)
          }
        );
    });

  }
  getAllTerapieFarmacologicaByPaziente(id:number):Observable<any> {
    return new Observable<any>((observer: Observer<any>) => {
      axios.get<any>(this.pazienteURL + "/getAllTerapieFarmacologicaByPaziente" + "/" + id).then
      ((response: AxiosResponse<any>) => {
        let jsonResponse: any[] = [];
        let any: any[] = [];
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          any.push(element)
        })
        console.log(any)

        observer.next(any);
        observer.complete();
      })
        .catch(error => {
            observer.next([])
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
    paziente.indirizzo = new Indirizzo();
    paziente.indirizzo.cap = "IS";
    paziente.indirizzo.città = "Pesche";
    paziente.indirizzo.via = "Contrada Lappone";
    paziente.esenzione = true;
    paziente.medico = this.offlineSetMedicoCurante();
    paziente.diagnosi = Diagnosi.IN_SALUTE;
    paziente.donatoreOrgani = false;
    paziente.attivo = true;
    paziente.setState(false);
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
    medico.setState(false);

    return medico;
  }
}
