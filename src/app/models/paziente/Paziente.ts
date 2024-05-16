import { Person } from "../person/person";
import { Indirizzo } from "../person/Indirizzo";
import { Medico } from "../medico/Medico";
import { Terapia } from "../Terapia/Terapia";

export class Paziente extends Person{
  constructor() {
    super(0, "", "", "", "", "");

    this._indirizzo = new Indirizzo();
    this._esenzione = false;
    this._donatoreOrgani = false;
    this._medico = new Medico();
    this._terapie = [];
  }

  private _indirizzo: Indirizzo;
  private _esenzione: boolean;
  private _donatoreOrgani: boolean;
  private _medico: Medico;
  private _terapie: Terapia[];

  get terapie(): Terapia[] {
    return this._terapie;
  }

  set terapie(value: Terapia[]) {
    this._terapie = value;
  }

  get indirizzo(): Indirizzo {
    return this._indirizzo;
  }

  set indirizzo(value: Indirizzo) {
    this._indirizzo = value;
  }

  get esenzione(): boolean {
    return this._esenzione;
  }

  set esenzione(value: boolean) {
    this._esenzione = value;
  }

  get donatoreOrgani(): boolean {
    return this._donatoreOrgani;
  }

  set donatoreOrgani(value: boolean) {
    this._donatoreOrgani = value;
  }

  get medico(): Medico {
    return this._medico;
  }

  set medico(value: Medico) {
    this._medico = value;
  }
}
