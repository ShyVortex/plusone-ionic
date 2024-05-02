import {Medico} from "../medico/Medico";
import {Paziente} from "../paziente/Paziente";
import {TipologiaTerapia} from "./tipologia-terapia";

export class Terapia {

  constructor() {
    this._id = 0
    this._orario = new Date()
    this._informazioneAggiuntive = ""
    this._causa = ""
    this._attivo = false;
    this._medicoCurante = new Medico()
    this._paziente = new Paziente()
    this._tipologiaTerapia = TipologiaTerapia.GENERALE
  }

  private _id:Number;
  private _orario:Date;
  private _informazioneAggiuntive:string;
  private _causa:string;
  private _attivo:boolean;
  private _medicoCurante:Medico;
  private _paziente:Paziente;
  private _tipologiaTerapia:TipologiaTerapia;

  get id(): Number {
    return this._id;
  }

  set id(value: Number) {
    this._id = value;
  }

  get orario(): Date {
    return this._orario;
  }

  set orario(value: Date) {
    this._orario = value;
  }

  get informazioneAggiuntive(): string {
    return this._informazioneAggiuntive;
  }

  set informazioneAggiuntive(value: string) {
    this._informazioneAggiuntive = value;
  }

  get causa(): string {
    return this._causa;
  }

  set causa(value: string) {
    this._causa = value;
  }

  get attivo(): boolean {
    return this._attivo;
  }

  set attivo(value: boolean) {
    this._attivo = value;
  }

  get medicoCurante(): Medico {
    return this._medicoCurante;
  }

  set medicoCurante(value: Medico) {
    this._medicoCurante = value;
  }

  get paziente(): Paziente {
    return this._paziente;
  }

  set paziente(value: Paziente) {
    this._paziente = value;
  }

  get tipologiaTerapia(): TipologiaTerapia {
    return this._tipologiaTerapia;
  }

  set tipologiaTerapia(value: TipologiaTerapia) {
    this._tipologiaTerapia = value;
  }
}
