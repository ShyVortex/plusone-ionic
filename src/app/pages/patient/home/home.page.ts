import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent, IonFooter,
  IonHeader, IonIcon, IonImg, IonItem, IonLabel,
  IonNav, IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs, IonText, IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PazienteService} from "../../../services/PazienteService/paziente.service";
import {MedicoService} from "../../../services/MedicoService/medico.service";
import {Subscription} from "rxjs";
import {Paziente} from "../../../models/paziente/Paziente";
import {ModelUtilities} from "../../../models/ModelUtilities";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonTabs,
    IonNav,
    IonTabBar,
    IonTabButton,
    IonIcon, IonImg, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomePage implements OnInit {

  private getAllMediciSubscription:Subscription;
  protected paziente: Paziente;
  private getPazienteByEmailSubscription:Subscription;
  private emailPaziente:string
  protected citta :string

  constructor(
    private navCtrl: NavController,
    private pazienteService:PazienteService,
    private medicoService:MedicoService
  ) {
    this.getAllMediciSubscription = new Subscription();
    this.getPazienteByEmailSubscription = new Subscription()
    this.paziente = new Paziente();
    this.emailPaziente = history.state.pazienteEmail
    this.citta = ""

    console.log(history.state.pazienteEmail)
  }

  ngOnInit() {
    this.getAllMediciSubscription = this.medicoService.getAllMedici().subscribe();
    this.getPazienteByEmailSubscription = this.pazienteService.getPazienteByEmail(this.emailPaziente).subscribe((value:Paziente) =>{
        this.paziente = value
        this.citta = this.paziente.indirizzo.città
    })


  }

  routeToSettings() {
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.navCtrl.navigateForward("settings-security");
  }

  logout() {
    this.navCtrl.navigateRoot("login");
  }

  goToHome() {
    this.navCtrl.navigateBack("patient-home", { animated: false });
  }

  goToLogbook() {
    this.navCtrl.navigateForward("patient-logbook", { animated: false });
  }

  goToReservation() {
    this.navCtrl.navigateForward("patient-reservation", { animated: false });
  }

  goToSOS() {
    this.navCtrl.navigateForward("patient-sos", { animated: false });
  }
  ionViewWillEnter() {


  }

}
