import { Persona } from "../persona/Persona";
import { Indirizzo } from "../persona/Indirizzo";
import { Medico } from "../medico/Medico";
import { Terapia } from "../terapia/Terapia";
import {Triage} from "../triage/Triage";

export class Paziente extends Persona {
  private _indirizzo: Indirizzo;
  private _esenzione: boolean;
  private _donatoreOrgani: boolean;
  private _medico: Medico;
  private _terapie: Terapia[];
  private _richieste: Triage[];

  constructor() {
    super(0, "", "", "", "", "");

    this._indirizzo = new Indirizzo();
    this._esenzione = false;
    this._donatoreOrgani = false;
    this._medico = new Medico();
    this._terapie = [];
    this._richieste = [];
  }

  get terapie(): Terapia[] {
    return this._terapie;
  }

  set terapie(value: Terapia[]) {
    this._terapie = value;
  }

  get richieste(): Triage[] {
    return this._richieste;
  }

  set richieste(value: Triage[]) {
    this._richieste = value;
  }

  get indirizzo(): Indirizzo {
    return this._indirizzo;
  }

  set indirizzo(value: Indirizzo) {
    this._indirizzo = value;
  }

  get esenzione(): boolean {
    return this._esenzione;
  }

  set esenzione(value: boolean) {
    this._esenzione = value;
  }

  get donatoreOrgani(): boolean {
    return this._donatoreOrgani;
  }

  set donatoreOrgani(value: boolean) {
    this._donatoreOrgani = value;
  }

  get medico(): Medico {
    return this._medico;
  }

  set medico(value: Medico) {
    this._medico = value;
  }
}
