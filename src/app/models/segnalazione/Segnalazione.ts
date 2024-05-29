export class Segnalazione {
  private _persona: any;
  private _schermata: string;
  private _errore: string;

  constructor() {
    this._persona = {};
    this._schermata = "";
    this._errore = "";
  }

  get persona() {
    return this._persona;
  }

  set persona(value: any) {
    this._persona = value;
  }

  get schermata() {
    return this._schermata;
  }

  set schermata(value: string) {
    this._schermata = value;
  }

  get errore() {
    return this._errore;
  }

  set errore(value: string) {
    this._errore = value;
  }
}
