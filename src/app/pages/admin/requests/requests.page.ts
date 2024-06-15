import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg, IonItem, IonList, IonRefresher, IonRefresherContent, IonRow, IonTabBar, IonTabButton, IonTabs,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {Admin} from "../../../models/admin/Admin";
import {AdminService} from "../../../services/AdminService/admin.service";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {Sesso} from "../../../models/persona/sesso";
import {Paziente} from "../../../models/paziente/Paziente";
import {Observable} from "rxjs";
import {DataService} from "../../../services/data.service";
import {PazienteService} from "../../../services/PazienteService/paziente.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonText, IonFooter, IonTabBar, IonTabButton, IonTabs, IonItem, IonList, IonRefresher, IonRefresherContent, IonRow, IonButton]
})

export class RequestsPage implements OnInit {
  protected admin: Admin;
  protected getAllInattiviObservable!: Observable<Paziente[]>;
  protected pazienti!: Paziente[];

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private adminService: AdminService,
    private pazienteService: PazienteService,
    private storageService: StorageService
  ) {
    this.admin = this.personaService.getPersona();

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.admin)
      this.admin = new Admin();
  }

  ngOnInit() {
    if (this.personaService.isDefault())
      this.adminService.offlineSetAdmin(this.admin);
  }

  ionViewWillEnter(){
    this.getAllInattiviObservable = this.pazienteService.getAllPazientiInattivi();
    this.getAllInattiviObservable.subscribe((value: Paziente[]) => {
      this.pazienti = value;
    });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getAllInattiviObservable.subscribe((value: Paziente[]) => {
        this.pazienti = value;
      });
      event.target.complete();
    }, 1000);
  }

  routeToRequestDetails(paziente: Paziente) {
    this.storageService.setPaziente(paziente);
    this.navCtrl.navigateForward("admin-request-details");
  }

  routeToSettings() {
    this.personaService.setPersona(this.admin);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
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
