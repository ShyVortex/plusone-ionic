import { Person } from "../person/person";

export class Infermiere extends Person {
  private _ospedale: string;
  private _reparto: string;
  private _ruolo: string;

  constructor() {
    super(0, "", "", "", "", "");

    this._ospedale = "";
    this._reparto = "";
    this._ruolo = "";
  }

  get ospedale(): string {
    return this._ospedale;
  }

  get reparto(): string {
    return this._reparto;
  }

  get ruolo(): string {
    return this._ruolo;
  }

  set ospedale(value: string) {
    this._ospedale = value;
  }

  set reparto(value: string) {
    this._reparto = value;
  }

  set ruolo(value: string) {
    this._ruolo = value;
  }
}
