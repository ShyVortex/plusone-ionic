import {Paziente} from "../paziente/Paziente";
import {Posizione} from "../paziente/Posizione";
import {CodiciTriage} from "./codici-triage";

export class Triage {
  private _id: number;
  private _codice: CodiciTriage;
  private _paziente: Paziente;
  private _posizione: Posizione;

  constructor() {
    this._id = 0;
    this._codice = CodiciTriage.UNDEFINED;
    this._paziente = new Paziente();
    this._posizione = new Posizione();
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

  get posizione(): Posizione {
    return this._posizione;
  }

  set posizione(value: Posizione) {
    this._posizione = value;
  }
}
