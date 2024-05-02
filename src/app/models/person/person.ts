import {person} from "ionicons/icons";

export abstract class Person {

  protected constructor(
     id: Number,
     nome: string,
     cognome: string,
     email: string,
     password: string,
     CF:string
  ) {
    this._id= id;
    this._nome = nome;
    this._cognome = cognome;
    this._email = email;
    this._password = password;
    this._CF = CF;
  }



  protected _id:Number;
  protected _nome:string;
  protected _cognome:string;
  protected _email:string;
  protected _password:string;
  protected _CF :string


  get id(): Number {
    return this._id;
  }

  set id(value: Number) {
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

  public isEmpty():boolean{
    if(this._nome==undefined && this._cognome==undefined && this._email==undefined && this._password==undefined && this._CF==undefined){
      return true;
    }
    else return false;
  }
}
