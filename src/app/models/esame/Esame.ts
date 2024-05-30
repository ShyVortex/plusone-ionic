export class Esame {
    private _id: number;
    private _codice: string;
    private _nome: string;
  
    constructor(id?: number, codice?: string, nome?: string) {
      this._id = id || 0;
      this._codice = codice || "";
      this._nome = nome || "";
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(value: number) {
      this._id = value;
    }
    
    get codice(): string {
      return this._codice;
    }
    
    set codice(value: string) {
      this._codice = value;
    }
    
    get nome(): string {
      return this._nome;
    }
    
    set nome(value: string) {
      this._nome = value;
    }
    
}
  