import { Injectable } from '@angular/core';
import {Paziente} from "../../models/paziente/Paziente";
import {Infermiere} from "../../models/infermiere/Infermiere";
import {Medico} from "../../models/medico/Medico";

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  private paziente: Paziente;
  private infermiere: Infermiere;
  private medico: Medico;
  private route: string;

  constructor() {
    this.paziente = new Paziente();
    this.infermiere = new Infermiere();
    this.medico = new Medico();
    this.route = "";
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
}
