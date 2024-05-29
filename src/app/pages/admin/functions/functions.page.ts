import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonCard, IonCardHeader, IonCardTitle,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonImg, IonItem, IonRow, IonTabBar, IonTabButton, IonTabs,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Admin} from "../../../models/admin/Admin";
import {AdminService} from "../../../services/AdminService/admin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-functions',
  templateUrl: './functions.page.html',
  styleUrls: ['./functions.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonText, IonFooter, IonTabBar, IonTabButton, IonTabs, IonCard, IonCardHeader, IonCardTitle, IonItem, IonRow]
})
export class FunctionsPage implements OnInit {
  protected admin: Admin;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private adminService: AdminService,
    private storageService: StorageService
  ) {
    this.admin = this.personaService.getPersona();

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.admin)
      this.admin = new Admin();
  }

  ngOnInit() {
    if (!this.admin.isSet())
      this.adminService.offlineSetAdmin(this.admin);
  }

  routeToSettings() {
    this.personaService.setPersona(this.admin);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
  }

  routeToMedicsList() {
    this.navCtrl.navigateForward("admin-functions-medics");
  }

  routeToNursesList() {
    this.navCtrl.navigateForward("admin-functions-nurses");
  }

  routeToPatientsList() {
    this.navCtrl.navigateForward("admin-functions-patients");
  }

  goToHome() {
    this.personaService.setPersona(this.admin);
    this.navCtrl.navigateForward("admin-home", { animated: false });
  }

  goToRequests() {
    this.personaService.setPersona(this.admin);
    this.navCtrl.navigateForward("admin-requests", { animated: false });
  }

  goToFunctions() {
    this.personaService.setPersona(this.admin);
    this.navCtrl.navigateForward("admin-functions", { animated: false });
  }

  goToReports() {
    this.personaService.setPersona(this.admin);
    this.navCtrl.navigateForward("admin-reports", { animated: false });
  }
}
