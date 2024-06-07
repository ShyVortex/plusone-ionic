import { Esame } from "../esame/Esame"
import { Farmaco } from "../farmaco/Farmaco"

export class TerapiaFarmacologica {
    private _esami: Esame[];
    private _farmaci: Farmaco[];

    constructor() {
        this._esami = [];
        this._farmaci = [];
    }

    get esami(): Esame[] {
        return this._esami;
    }

    set esami(value: Esame[]) {
        this._esami = value;
    }

    get farmaci(): Farmaco[] {
        return this._farmaci;
    }

    set farmaci(value: Farmaco[]) {
        this._farmaci = value;
    }
}