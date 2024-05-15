import { Medico } from "../medico/Medico";
import { Paziente } from "../paziente/Paziente";
import { TipologiaTerapia } from "./tipologia-terapia";

export class Terapia {
  private _id: number;
  private _orario: string;
  private _informazioneAggiuntive: string;
  private _causa: string;
  private _attivo: boolean;
  private _medicoCurante: Medico;
  private _paziente: Paziente;
  private _tipologiaTerapia: TipologiaTerapia;
  private _reparto: string;

  constructor() {
    this._id = 0;
    this._orario = "";
    this._informazioneAggiuntive = "";
    this._causa = "";
    this._attivo = false;
    this._medicoCurante = new Medico();
    this._paziente = new Paziente();
    this._tipologiaTerapia = TipologiaTerapia.GENERALE;
    this._reparto = "";
  }

  get id(): number {
    return this._id;
  }

  get orario(): string {
    return this._orario;
  }

  get informazioneAggiuntive(): string {
    return this._informazioneAggiuntive;
  }

  get causa(): string {
    return this._causa;
  }

  get attivo(): boolean {
    return this._attivo;
  }

  get medicoCurante(): Medico {
    return this._medicoCurante;
  }

  get paziente(): Paziente {
    return this._paziente;
  }

  get tipologiaTerapia(): TipologiaTerapia {
    return this._tipologiaTerapia;
  }

  get reparto(): string {
    return this._reparto;
  }

  set id(value: number) {
    this._id = value;
  }

  set orario(value: string) {
    this._orario = value;
  }

  set informazioneAggiuntive(value: string) {
    this._informazioneAggiuntive = value;
  }

  set causa(value: string) {
    this._causa = value;
  }

  set attivo(value: boolean) {
    this._attivo = value;
  }

  set medicoCurante(value: Medico) {
    this._medicoCurante = value;
  }

  set paziente(value: Paziente) {
    this._paziente = value;
  }

  set tipologiaTerapia(value: TipologiaTerapia) {
    this._tipologiaTerapia = value;
  }

  set reparto(value: string) {
    this._reparto = value;
  }
}
