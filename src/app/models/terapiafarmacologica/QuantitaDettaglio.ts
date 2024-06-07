import {Farmaco} from "../farmaco/Farmaco";

export class QuantitaDettaglio {
  private _quantita: number;
  private _note: string;
  private _id: number;
  private _farmaco: Farmaco;

  constructor() {
    this._quantita = 0;
    this._note = "";
    this._id = 0;
    this._farmaco = new Farmaco();
  }

  get id(): number {
    return this._id;
  }

  get farmaco(): Farmaco {
    return this._farmaco;
  }

  set farmaco(value: Farmaco) {
    this._farmaco = value;
  }

  set id(value: number) {
    this._id = value;
  }

  get quantita(): number {
        return this._quantita;
    }

    set quantita(value: number) {
        this._quantita = value;
    }

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }
}
