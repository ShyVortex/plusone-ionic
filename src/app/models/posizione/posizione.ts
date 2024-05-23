export class Posizione {
  private _latitudine: number;
  private _longitudine: number;

  constructor(
    private latitude: number,
    private longitude: number
  ) {
    this._latitudine = latitude;
    this._longitudine = longitude;
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
