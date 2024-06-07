import { Injectable } from '@angular/core';
import {Paziente} from "../../models/paziente/Paziente";
import {Infermiere} from "../../models/infermiere/Infermiere";
import {Medico} from "../../models/medico/Medico";
import { cloneDeep, isEqual } from 'lodash';
import {Terapia} from "../../models/terapia/Terapia";
import {Triage} from "../../models/triage/Triage";
import {Segnalazione} from "../../models/segnalazione/Segnalazione";
import {TerapiaFarmacologica} from "../../models/terapiafarmacologica/TerapiaFarmacologica";
import {QuantitaDettaglio} from "../../models/terapiafarmacologica/QuantitaDettaglio";
import {Esame} from "../../models/esame/Esame";

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private paziente: Paziente;
  private infermiere: Infermiere;
  private medico: Medico;
  private route: string;
  private loginCache: any[];
  private terapia!: Terapia;
  private terapie!: Terapia[];
  private triage!: Triage;
  private richieste!: Triage[];
  private segnalazione!: Segnalazione;
  private segnalazioni: Segnalazione[];
  private tFarmacologicaId!:number
  private tpaFarm!: TerapiaFarmacologica;
  private tpeFarm: TerapiaFarmacologica[];
  private quantitaDettagli: QuantitaDettaglio[];
  private esami: Esame[];

  constructor() {
    this.paziente = new Paziente();
    this.infermiere = new Infermiere();
    this.medico = new Medico();
    this.route = "";
    this.loginCache = [];
    this.segnalazioni = [];
    this.tpeFarm = [];
    this.quantitaDettagli = [];
    this.esami = [];
  }

  setPaziente(paziente: Paziente) {
    this.paziente = paziente;
  }

  getPaziente() {
    return this.paziente;
  }

  setInfermiere(infermiere: Infermiere) {
    this.infermiere = infermiere;
  }

  getInfermiere() {
    return this.infermiere;
  }

  setMedico(medico: Medico) {
    this.medico = medico;
  }

  getMedico() {
    return this.medico;
  }

  getRoute() {
    return this.route;
  }

  setRoute(value: string) {
    this.route = value;
  }

  getTerapia() {
    return this.terapia;
  }

  setTerapia(value: Terapia) {
    this.terapia = value;
  }

  getTerapie() {
    if (this.terapie)
      return this.terapie;
    else
      return [];
  }

  cacheTerapie(value: Terapia[]) {
    this.terapie = value;
  }

  getTriage() {
    return this.triage;
  }

  setTriage(value: Triage) {
    this.triage = value;
  }

  getRichieste() {
    return this.richieste;
  }

  cacheRichieste(value: Triage[]) {
    this.richieste = value;
  }

  getSegnalazione() {
    return this.segnalazione;
  }

  setSegnalazione(value: Segnalazione) {
    this.segnalazione = value;
  }

  getSegnalazioni() {
    return this.segnalazioni;
  }

  setTfarmacologicaId(value: number) {
    this.tFarmacologicaId = value
  }

  getTFarmacologicaId() {
    return this.tFarmacologicaId;
  }

  cacheSegnalazione(value: Segnalazione) {
    this.segnalazioni.push(value);
  }

  getTFarmacologica() {
    return this.tpaFarm;
  }

  setTFarmacologica(value: TerapiaFarmacologica) {
    this.tpaFarm = value;
  }

  getTFarmacologiche() {
    return this.tpeFarm;
  }

  cacheTFarmacologica(value: TerapiaFarmacologica) {
    this.tpeFarm.push(value);
  }

  getQuantitaDettagli() {
    return this.quantitaDettagli;
  }

  getEsami() {
    return this.esami;
  }

  getAllStates() {
    return this.loginCache;
  }

  getState(value: string): any {
    if (value !== null) {
      // Verifica che esista un profilo salvato per email
      const index = this.loginCache.findIndex(item => item.email === value);
      if (index !== -1) {
        if (isEqual(this.loginCache[index].email, value))
          return this.loginCache[index];
      } else {
        console.error('Cannot GET: email not found in cache,', value);
        return undefined;
      }
    }
    else
      console.error('Cannot retrieve state: value is undefined or not a supported instance,', value);
  }

  cacheState(value: any) {
    if (value && value.id !== undefined) {
      if (value instanceof Paziente || value instanceof Infermiere || value instanceof Medico) {
        if (!this.loginCache.includes(value)) {
          // this.loginCache.push(value); --> Shallow Copy
          this.loginCache.push(cloneDeep(value)); // --> Deep Copy
          /* Una deep Copy salva correttamente non solo l'oggetto ma tutte le sue proprietà innestate,
             mentre una Shallow Copy aggiorna solo l'oggetto */
          console.log(this.loginCache);
        }
        else
          this.updateState(value);
      }
      else
        console.error('Cannot CACHE: unsupported instance,', value);
    } else
      console.error('Invalid value: missing id property,', value);
  }

  updateState(value: any) {
    const index = this.loginCache.findIndex(item => item.id === value.id);
    if (index !== -1) {
      if (!isEqual(this.loginCache[index], value))
        this.loginCache[index] = cloneDeep(value);
      else
        console.log('The value to update hasn\'t been modified');
    } else {
      console.error('Cannot UPDATE: id not found in cache,', value);
    }
  }
}
