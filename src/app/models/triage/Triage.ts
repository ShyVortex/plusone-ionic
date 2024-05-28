import {Paziente} from "../paziente/Paziente";
import {CodiciTriage} from "./codici-triage";
import {Conferma} from "./Conferma";

export class Triage {
  get conferma(): Conferma {
    return this._conferma;
  }

  set conferma(value: Conferma) {
    this._conferma = value;
  }
  get descrizione(): string {
    return this._descrizione;
  }

  set descrizione(value: string) {
    this._descrizione = value;
  }
  private _id: number;
  private _codice: CodiciTriage;
  private _paziente: Paziente;
  private _latitudine:number;
  private _longitudine:number;
  private _descrizione:string;
  private _conferma:Conferma;

  constructor() {
    this._id = 0;
    this._codice = CodiciTriage.UNDEFINED;
    this._paziente = new Paziente();
    this._latitudine = 0.00
    this._longitudine = 0.00
    this._descrizione = ""
    this._conferma = Conferma.IN_ATTESA;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get codice(): CodiciTriage {
    return this._codice;
  }

  set codice(value: CodiciTriage) {
    this._codice = value;
  }

  get paziente(): Paziente {
    return this._paziente;
  }

  set paziente(value: Paziente) {
    this._paziente = value;
  }

  get latitudine(): number {
    return this._latitudine;
  }

  set latitudine(value: number) {
    this._latitudine = value;
  }

  get longitudine(): number {
    return this._longitudine;
  }

  set longitudine(value: number) {
    this._longitudine = value;
  }

}
