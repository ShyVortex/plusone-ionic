import { Persona } from "../persona/persona";

export class Infermiere extends Persona {
  constructor() {
    super(0, "", "", "", "", "");
    this._ospedale = "";
    this._reparto = "";
    this._ruolo = "";
  }

  private _ospedale: string;
  private _reparto: string;
  private _ruolo: string;

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
}
