export class Person {

  constructor(
     id: Number,
     nome: String,
     cognome: String,
     email: String,
     password: String,
     ruolo: String
  ) {
    this.id= id;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.password = password;
    this.ruolo = ruolo;
  }

  private id;
  private nome;
  private cognome;
  private email;
  private password;
  private ruolo;
}
