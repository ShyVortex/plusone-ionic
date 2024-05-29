import {Injectable} from '@angular/core';
import {Admin} from "../../models/admin/Admin";
import {Sesso} from "../../models/persona/sesso";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  offlineSetAdmin(admin: Admin) {
    admin.nome = "Bruno";
    admin.cognome = "Strati";
    admin.sesso = Sesso.MASCHIO;
    admin.email = "bruno.strati@admin.it";
    admin.password = "password123";
    admin.CF = "STRBRN66H06C351Y";
  }
}
