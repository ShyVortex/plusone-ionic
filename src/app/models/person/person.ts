import {Sesso} from "./sesso";

export abstract class Person {
  protected constructor(
     id: number,
     nome: string,
     cognome: string,
     email: string,
     password: string,
     CF: string
  ) {
    this._id = id;
    this._nome = nome;
    this._cognome = cognome;
    this._sesso = Sesso.MASCHIO;
    this._email = email;
    this._password = password;
    this._CF = CF;
    this._isSet = false;
  }

  protected _id: number;
  protected _nome: string;
  protected _cognome: string;
  protected _sesso: Sesso;
  protected _email: string;
  protected _password: string;
  protected _CF: string
  protected _isSet: boolean;

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  public get nome(): string {
    return this._nome;
  }

  set nome(value: string) {
    this._nome = value;
  }

  get cognome(): string {
    return this._cognome;
  }

  set cognome(value: string) {
    this._cognome = value;
  }

  get sesso(): Sesso {
    return this._sesso;
  }

  set sesso(value: Sesso) {
    this._sesso = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get CF(): string {
    return this._CF;
  }

  set CF(value: string) {
    this._CF = value;
  }

  public isSet(): boolean {
    return this._isSet;
  }

  public setState(value: boolean) {
    this._isSet = value;
  }

  public isEmpty(): boolean{
    if(
      this._nome == undefined &&
      this._cognome == undefined &&
      this._email == undefined &&
      this._password == undefined &&
      this._CF == undefined
    ) {
      return true;
    } else {
      return false;
    }
  }
}
