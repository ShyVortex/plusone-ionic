import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class PersonaService {
  private persona: any;

  constructor() { }

  setPersona(persona: any) {
    this.persona = persona;
  }

  getPersona() {
    return this.persona;
  }
}
