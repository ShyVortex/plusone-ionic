import { Injectable } from '@angular/core';
import {Paziente} from "../../models/paziente/Paziente";
import {Triage} from "../../models/triage/Triage";

@Injectable({
  providedIn: 'root'
})

export class TriageService {

  constructor() { }

  addRichiestaOffline(paziente: Paziente, richiesta: Triage) {
    paziente.richieste.push(richiesta);
  }
}
