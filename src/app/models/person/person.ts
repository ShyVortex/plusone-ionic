export class Person {

  constructor(
     id: Number,
     nome: string,
     cognome: string,
     email: string,
     password: string,
     ruolo: string,
     username:string
  ) {
    this.id= id;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
    this.ruolo = ruolo;
    this.username = username
  }



  public id:Number;
  public nome:string;
  public cognome:string;
  public email:string;
  public password:string;
  public ruolo:string;
  public username:string


  public getId():Number{
    return this.id;
  }
  public getNome():string{
    return this.nome;
  }
  public getCognome():string{
    return this.cognome;
  }
  public getEmail():string{
    return this.email;
  }
  public getPassword():string{
    return this.password;
  }
  getRuolo():string{
    return this.ruolo;
  }
  getUsername():string{
    return this.username;
  }
  static fromJSON(json: any): Person {
    return new Person(
      json.id,
      json.nome,
      json.cognome,
      json.email,
      json.password,
      json.ruolo,
      json.username
    );
  }
  public isEmpty():boolean{
    if(this.nome==undefined && this.cognome==undefined && this.email==undefined && this.password==undefined && this.username==undefined){
      return true;
    }
    else return false;
  }
}
