export class Posizione {
  private _latitudine: number;
  private _longitudine: number;

  constructor() {
    this._latitudine = 0;
    this._longitudine = 0;
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
