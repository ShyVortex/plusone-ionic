export class QuantitaDettagli {
    private _quantita: number;
    private _note: string;

    constructor() {
        this._quantita = 0;
        this._note = "";
    }

    get quantita(): number {
        return this._quantita;
    }

    set quantita(value: number) {
        this._quantita = value;
    }

    get note(): string {
        return this._note;
    }

    set note(value: string) {
        this._note = value;
    }
}