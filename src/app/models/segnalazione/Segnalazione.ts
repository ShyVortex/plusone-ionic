export class Segnalazione {
  private _utente: any;
  private _schermataBug: string;
  private _descrizione: string;
  private _id:number;

  constructor() {
    this._utente = {};
    this._schermataBug = "";
    this._descrizione = "";
    this._id = 0;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get utente() {
    return this._utente;
  }

  set utente(value: any) {
    this._utente = value;
  }

  get schermataBug() {
    return this._schermataBug;
  }

  set schermataBug(value: string) {
    this._schermataBug = value;
  }

  get descrizione() {
    return this._descrizione;
  }

  set descrizione(value: string) {
    this._descrizione = value;
  }
}
