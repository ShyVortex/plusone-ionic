import { Person } from "../person/person";
import { TipologiaMedico } from "./tipologia-medico";
import { Terapia } from "../Terapia/Terapia";

export class Medico extends Person {
  private _ospedale: string;
  private _reparto: string;
  private _ruolo: string;
  private _tipologiaMedico: TipologiaMedico;
  private _pazienti: Medico[];
  private _terapie: Terapia[];

  constructor() {
    super(0, "", "", "", "", "");
    
    this._ospedale = "";
    this._reparto = "";
    this._ruolo = "";
    this._tipologiaMedico = TipologiaMedico.OSPEDALIERO;
    this._pazienti = [];
    this._terapie = [];
  }
  
  public get ospedale(): string {
    return this._ospedale;
  }

  public get reparto(): string {
    return this._reparto;
  }

  public get ruolo(): string {
    return this._ruolo;
  }

  public get tipologiaMedico(): TipologiaMedico {
    return this._tipologiaMedico;
  }

  public get pazienti(): Medico[] {
    return this._pazienti;
  }

  public get terapie(): Terapia[] {
    return this._terapie;
  }

  public set pazienti(value: Medico[]) {
    this._pazienti = value;
  }

  public set terapie(value: Terapia[]) {
    this._terapie = value;
  }

  public set ospedale(value: string) {
    this._ospedale = value;
  }

  public set reparto(value: string) {
    this._reparto = value;
  }

  public set ruolo(value: string) {
    this._ruolo = value;
  } 

  public set tipologiaMedico(value: TipologiaMedico) {
    this._tipologiaMedico = value;
  }
}
