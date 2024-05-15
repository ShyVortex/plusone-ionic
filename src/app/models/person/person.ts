import { person } from "ionicons/icons";

export abstract class Person {
  private _id: number;
  private _nome: string;
  private _cognome: string;
  private _email: string;
  private _password: string;
  private _CF: string
  private _isSet: boolean;

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
    this._email = email;
    this._password = password;
    this._CF = CF;
    this._isSet = false;
  }

  public get id(): number {
    return this._id;
  }

  public get nome(): string {
    return this._nome;
  }

  public get cognome(): string {
    return this._cognome;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get CF(): string {
    return this._CF;
  }

  public isSet(): boolean {
    return this._isSet;
  }

  public set id(value: number) {
    this._id = value;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  public set cognome(value: string) {
    this._cognome = value;
  }

  public set email(value: string) {
    this._email = value;
  }

  public set password(value: string) {
    this._password = value;
  }

  public set CF(value: string) {
    this._CF = value;
  }

  public setState(value: boolean) {
    this._isSet = value;
  }

  public isEmpty(): boolean {
    if (
      this._nome == undefined && 
      this._cognome == undefined && 
      this._email == undefined && 
      this._password == undefined && 
      this._CF == undefined
    ) {
      return true;
    } else { 
      return false 
    };
  }
}
