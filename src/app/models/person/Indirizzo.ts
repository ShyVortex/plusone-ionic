export class Indirizzo {

  constructor() {
    this._cap = ""
    this._via = ""
    this._numeroCivico = ""
    this._citta = ""
  }

  private _cap:string;
  private _via:string;
  private _numeroCivico:string;
  private _citta:string;

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

  get citta(): string {
    return this._citta;
  }

  set citta(value: string) {
    this._citta = value;
  }
}
