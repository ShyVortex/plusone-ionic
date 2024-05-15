import { Person } from "../person/person";
import { Indirizzo } from "../person/Indirizzo";
import { Medico } from "../medico/Medico";
import { Terapia } from "../Terapia/Terapia";

export class Paziente extends Person {
  private _indirizzo: Indirizzo;
  private _esenzione: boolean;
  private _donatoreOrgani: boolean;
  private _medico: Medico;
  private _terapie: Terapia[];
  
  constructor() {
    super(0, "", "", "", "", "");

    this._indirizzo = new Indirizzo();
    this._esenzione = false;
    this._donatoreOrgani = false;
    this._medico = new Medico();
    this._terapie = [];
  }

  public get indirizzo(): Indirizzo {
    return this._indirizzo;
  }

  public get esenzione(): boolean {
    return this._esenzione;
  }

  public get donatoreOrgani(): boolean {
    return this._donatoreOrgani;
  }

  public get medico(): Medico {
    return this._medico;
  }

  public get terapie(): Terapia[] {
    return this._terapie;
  }

  public set indirizzo(value: Indirizzo) {
    this._indirizzo = value;
  }

  public set esenzione(value: boolean) {
    this._esenzione = value;
  }

  public set donatoreOrgani(value: boolean) {
    this._donatoreOrgani = value;
  }

  public set medico(value: Medico) {
    this._medico = value;
  }

  public set terapie(value: Terapia[]) {
    this._terapie = value;
  }
}
