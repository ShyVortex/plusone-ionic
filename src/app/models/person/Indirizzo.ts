export class Indirizzo {
  private _cap: string;
  private _via: string;
  private _numeroCivico: string;
  private _città: string;

  constructor() {
    this._cap = ""
    this._via = ""
    this._numeroCivico = ""
    this._città = ""
  }

  get cap(): string {
    return this._cap;
  }

  get via(): string {
    return this._via;
  }

  get numeroCivico(): string {
    return this._numeroCivico;
  }

  get città(): string {
    return this._città;
  }

  set cap(value: string) {
    this._cap = value;
  }

  set via(value: string) {
    this._via = value;
  }

  set numeroCivico(value: string) {
    this._numeroCivico = value;
  }

  set città(value: string) {
    this._città = value;
  }
}
