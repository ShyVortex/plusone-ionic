export class Indirizzo {
  private _cap: string;
  private _via: string;
  private _numeroCivico: string;
  private _città: string;

  constructor() {
    this._cap = "";
    this._via = "";
    this._numeroCivico = "";
    this._città = "";
  }

  get cap(): string {
    return this._cap;
  }

  set cap(value: string) {
    this._cap = value;
  }

  get via(): string {
    return this._via;
  }

  set via(value: string) {
    this._via = value;
  }

  get numeroCivico(): string {
    return this._numeroCivico;
  }

  set numeroCivico(value: string) {
    this._numeroCivico = value;
  }

  get città(): string {
    return this._città;
  }

  set città(value: string) {
    this._città = value;
  }
}
