import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardHeader, IonCardTitle,
  IonContent, IonFooter,
  IonHeader, IonIcon,
  IonImg,
  IonItem,
  IonLabel, IonRow, IonTabBar, IonTabButton, IonTabs,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Admin} from "../../../models/admin/Admin";
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {AdminService} from "../../../services/AdminService/admin.service";
import {Sesso} from "../../../models/persona/sesso";
import {LoginPage} from "../../registration/login/login.page";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonText, IonLabel, IonItem, IonRow, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonFooter, IonTabs, IonTabBar, IonTabButton]
})

export class HomePage implements OnInit {
  protected admin: Admin;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private adminService: AdminService,
    private storageService: StorageService,
  ) {
    this.admin = personaService.getPersona();

    if (!this.admin)
      this.admin = new Admin();
  }

  ngOnInit() {
    if (this.personaService.isDefault())
      this.adminService.offlineSetAdmin(this.admin);
  }

  routeToSettings() {
    this.personaService.setPersona(this.admin);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.personaService.setPersona(this.admin);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings-security");
  }

  async logout() {
    if (this.personaService.isDefault())
      this.storageService.cacheState(this.admin);

    await this.navCtrl.navigateRoot("login");
    LoginPage.canBypassToast = false;
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

    protected readonly Sesso = Sesso;
}
