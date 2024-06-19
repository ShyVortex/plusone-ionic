import {Injectable} from '@angular/core';
import {Paziente} from "../../models/paziente/Paziente";
import {Observable, Observer} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {ModelUtilities} from "../../models/ModelUtilities";
import {Medico} from "../../models/medico/Medico";
import {Terapia} from "../../models/terapia/Terapia";
import {TipologiaMedico} from "../../models/medico/tipologia-medico";
import {Sesso} from "../../models/persona/sesso";
import {StorageService} from "../StorageService/storage.service";
import {Diagnosi} from "../../models/paziente/Diagnosi";

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  private baseURL: string = "https://plusone-backend-8nmk.onrender.com/api/";
  private medicoURL = this.baseURL + "medici";

  constructor(
    private storageService: StorageService
  ) {}

  updateMedico(medicoToUpdate:Medico,id:number) : Observable<Medico> {
    let jsonResponse: any;
    let medico: Medico;

    return new Observable<Medico>((observer: Observer<Medico>) => {
      axios.put<Medico>(this.medicoURL + "/updateMedico"+"/" + id,medicoToUpdate).then
      ((response: AxiosResponse<Medico>) => {
        jsonResponse = response.data
        medico = ModelUtilities.medicoFromJSON(jsonResponse)
        console.log(medico)

        observer.next(medico);
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }

  deleteMedico(id:number) : Observable<void> {
    return new Observable<void>((observer: Observer<void>) => {
      axios.delete<void>(this.medicoURL + "/deleteMedico"+"/" + id).then
      ((response: AxiosResponse<void>) => {
        observer.next()
        observer.complete();
      }).catch(error => {console.log(error)});
    });
  }

  getAllMedici(): Observable<Medico[]> {
    let jsonResponse: any[] = [];
    let medici: Medico[] = [];

    return new Observable<Medico[]>((observer: Observer<Medico[]>) => {
      axios.get<Medico[]>(this.medicoURL + "/getAll").then
      ((response: AxiosResponse<Medico[]>) => {
        jsonResponse = response.data
        jsonResponse.forEach((element: any) => {
          medici.push(ModelUtilities.medicoFromJSON(element))
        })
        console.log(medici)

        observer.next(medici);
        observer.complete();
      }).catch(error => {console.log(error)
      observer.next([])
      });
    });
  }

  getAllPazientiByMedico(id_medico: number): Observable<Paziente[]> {
    let jsonResponse: any = [];
    let pazienti: Paziente[] = [];

    return new Observable<Paziente[]>((observer: Observer<Paziente[]>) => {
      axios.get<Paziente[]>(this.medicoURL + "/getAllPazientiByMedico" + "/"+ id_medico).then(
        (response: AxiosResponse<Paziente[]>) => {
          jsonResponse = response.data;
          jsonResponse.forEach((element: any) => {
            pazienti.push(ModelUtilities.pazienteFromJSON(element));
          })

          observer.next(pazienti);
          observer.complete();
        }
      ).catch(error => {console.log(error)});
    });
  }

  getMedicoByEmail(email: string) : Observable<Medico> {
    let jsonResponse: any;
    let medico: Medico;

    return new Observable<Medico>((observer: Observer<Medico>)  => {
      axios.get<Medico>(this.medicoURL +"/getMedicoByEmail/" + email).then(
        (response: AxiosResponse<Medico>)  => {
          jsonResponse = response.data;
          medico = ModelUtilities.medicoFromJSON(jsonResponse);

          observer.next(medico);
          observer.complete();
        }
      ).catch(error => {console.log(error)});
    });
  }

  addPazienteToMedico(id_medico: number, id_paziente: number) : Observable<Medico> {
    let jsonResponse:any;
    let medico:Medico;

    return new Observable<Medico>((observer:Observer<Medico>)  => {
      axios.put<Medico>(this.medicoURL + "/addPazienteToMedico" + "/" + id_medico + "/" + id_paziente).then(
        (response: AxiosResponse<Medico>)  => {
          jsonResponse = response.data
          medico = ModelUtilities.medicoFromJSON(jsonResponse);

          observer.next(medico);
          observer.complete();
        }
      ).catch(error => {console.log(error)});
    });
  }

  getAllPrenotazioniByMedico(id_medico:number):Observable<Terapia[]> {
    return new Observable<Terapia[]>((observer: Observer<Terapia[]>) => {
      axios.get<Terapia[]>(this.medicoURL + "/getAllPrenotazioniByMedico"+"/"+id_medico).then
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

  offlineSetMedico(medico: Medico) {
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
    medico.pazienti = [];
    medico.pazienti.push(this.offlineAddPaziente());
  }

  offlineAddPaziente(): Paziente {
    let paziente: Paziente = this.storageService.getState("mario.giannini@paziente.it");

    if (paziente !== undefined && !paziente.isSet())
      return paziente;

    else {
      paziente = new Paziente();

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
      paziente.donatoreOrgani = false;
      paziente.diagnosi = Diagnosi.IN_SALUTE;
      paziente.setState(false);

      return paziente;
    }
  }
}
