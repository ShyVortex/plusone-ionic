export class Esame {
    private _id: number;
    private _codice: string;
    private _nome: string;
    private _categoria: string;
    private _principioattivo: string;
    private _azienda: string;
  
    constructor(id?: number, codice?: string, nome?: string, categoria?: string, principioattivo?: string, azienda?: string) {
      this._id = id || 0;
      this._codice = codice || "";
      this._nome = nome || "";
      this._categoria = categoria || "";
      this._principioattivo = principioattivo || "";
      this._azienda = azienda || "";
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
    
    get categoria(): string {
      return this._categoria;
    }
    
    set categoria(value: string) {
      this._categoria = value;
    }
    
    get principioattivo(): string {
      return this._principioattivo;
    }
    
    set principioattivo(value: string) {
      this._principioattivo = value;
    }
    
    get azienda(): string {
      return this._azienda;
    }
    
    set azienda(value: string) {
      this._azienda = value;
    }
  }
  