import {Persona} from "../persona/persona";
import {TipologiaMedico} from "./tipologia-medico";
import {Terapia} from "../Terapia/Terapia";
import {Paziente} from "../paziente/Paziente";

export class Medico extends Persona {
  constructor() {
    super(0, "", "", "", "", "");
    this._ospedale = "";
    this._reparto = "";
    this._ruolo = "";
    this._tipologiaMedico = TipologiaMedico.OSPEDALIERO;
    this._pazienti = [];
    this._terapie = [];
    this._isManager = false;
  }

  private _ospedale: string;
  private _reparto: string;
  private _ruolo: string;
  private _tipologiaMedico: TipologiaMedico;
  private _pazienti: Paziente[];
  private _terapie: Terapia[];
  private _isManager: boolean;

  get pazienti(): Paziente[] {
    return this._pazienti;
  }

  set pazienti(value: Paziente[]) {
    this._pazienti = value;
  }

  get terapie(): Terapia[] {
    return this._terapie;
  }

  set terapie(value: Terapia[]) {
    this._terapie = value;
  }

  get ospedale(): string {
    return this._ospedale;
  }

  set ospedale(value: string) {
    this._ospedale = value;
  }

  get reparto(): string {
    return this._reparto;
  }

  set reparto(value: string) {
    this._reparto = value;
  }

  get ruolo(): string {
    return this._ruolo;
  }

  set ruolo(value: string) {
    this._ruolo = value;
  }

  get isManager(): boolean {
    return this._isManager;
  }

  set isManager(value: boolean) {
    this._isManager = value;
  }

  get tipologiaMedico(): TipologiaMedico {
    return this._tipologiaMedico;
  }

  set tipologiaMedico(value: TipologiaMedico) {
    this._tipologiaMedico = value;
  }
}
