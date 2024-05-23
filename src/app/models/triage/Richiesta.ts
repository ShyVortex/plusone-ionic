import {Paziente} from "../paziente/Paziente";
import {Posizione} from "../posizione/posizione";
import {CodiciTriage} from "./codici-triage";

export class Richiesta {
  private _id: number;
  private _codice: CodiciTriage;
  private _paziente: Paziente;
  private _posizione: Posizione;

  constructor(
    private code: CodiciTriage,
    private patient: Paziente,
    private position: Posizione,
  ) {
    this._id = this.setId();
    this._codice = code;
    this._paziente = patient;
    this._posizione = position;
  }

  get id(): number {
    return this._id;
  }

  setId(): number {
    if (this._id === undefined)
      return 0;

    return this._id++;
  }

  get codice(): CodiciTriage {
    return this._codice;
  }

  set codice(value: CodiciTriage) {
    this._codice = value;
  }

  get paziente(): Paziente {
    return this.paziente;
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
