import { Injectable } from '@angular/core';
import {CodiciTriage} from "../../models/triage/codici-triage";
import {Paziente} from "../../models/paziente/Paziente";
import {Posizione} from "../../models/posizione/posizione";

@Injectable({
  providedIn: 'root'
})

export class TriageService {

  constructor() { }

  addRichiestaOffline(codice: CodiciTriage, paziente: Paziente, posizione: Posizione) {

  }
}
