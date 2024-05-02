import {Person} from "../person/person";
import {TipologiaMedico} from "./tipologia-medico";
import {Terapia} from "../Terapia/Terapia";

export class Medico extends Person {
  constructor() {
    super(0,"","","","","");
    this._ospedale = ""
    this._reparto = ""
    this._ruolo = ""
    this._tipologiaMedico = TipologiaMedico.OSPEDALIERO
    this._pazienti = []
    this._terapie = []
  }
  private _ospedale:string;

  private _reparto:string;

  private _ruolo:string;

  private _tipologiaMedico : TipologiaMedico;

  private _pazienti : Medico[];

  private _terapie : Terapia[];


  get pazienti(): Medico[] {
    return this._pazienti;
  }

  set pazienti(value: Medico[]) {
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

  get tipologiaMedico(): TipologiaMedico {
    return this._tipologiaMedico;
  }

  set tipologiaMedico(value: TipologiaMedico) {
    this._tipologiaMedico = value;
  }
}