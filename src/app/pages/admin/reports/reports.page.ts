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
import {Segnalazione} from "../../../models/segnalazione/Segnalazione";
import {Sesso} from "../../../models/persona/sesso";
import {SegnalazioneService} from "../../../services/SegnalazioneService/segnalazione.service";
import {Terapia} from "../../../models/terapia/Terapia";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonText, IonFooter, IonTabBar, IonTabButton, IonTabs, IonItem, IonList, IonRefresher, IonRefresherContent, IonRow, IonButton]
})

export class ReportsPage implements OnInit {
  protected admin: Admin;
  protected segnalazioni: Segnalazione[];
  protected ruolo: any;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private adminService: AdminService,
    private storageService: StorageService,
    private segnalazioneService: SegnalazioneService
  ) {
    this.admin = personaService.getPersona();
    this.segnalazioni = [];

    /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
    if (!this.admin)
      this.admin = new Admin();
  }

  ngOnInit() {
     this.segnalazioneService.getAllSegnalazioni().subscribe(value => {
       this.segnalazioni = value
    })

  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.segnalazioneService.getAllSegnalazioni().subscribe(value => {
        this.segnalazioni = value
      })
      event.target.complete();
    }, 1000);


  }
  ionViewWillEnter(){
    this.segnalazioneService.getAllSegnalazioni().subscribe(value => {
      this.segnalazioni = value
    })
  }


  routeToReportDetails(segnalazione: Segnalazione) {
    this.storageService.setSegnalazione(segnalazione);
    this.navCtrl.navigateForward("admin-report-details");
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

  checkRichieste() {
    if (this.segnalazioni.length > 0) {
      let valid: boolean = false;

      this.segnalazioni.forEach(segnalazione => {
        if (segnalazione.attivo)
          valid = true;
      });

      return valid;
    }
    else
      return false;
  }
}
