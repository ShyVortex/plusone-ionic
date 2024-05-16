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
import {Observable, Subscription} from "rxjs";
import {Paziente} from "../../../models/paziente/Paziente";
import {ModelUtilities} from "../../../models/ModelUtilities";
import {Medico} from "../../../models/medico/Medico";
import {DataService} from "../../../services/data.service";
import {NavigationExtras} from "@angular/router";
import {PersonaService} from "../../../services/PersonaService/persona.service";

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
  private getPazienteByEmailObservable:Observable<Paziente>;
  private emailPaziente!:string
  protected citta! :string
  private getMedicoByEmailObservable:Observable<Medico>
  private dataSubscription!:Subscription;

  constructor(
    private navCtrl: NavController,
    private personaService:PersonaService,
    private pazienteService:PazienteService,
    private medicoService:MedicoService,
    private dataService: DataService,
  ) {
    this.getAllMediciSubscription = new Subscription();
    this.getPazienteByEmailObservable = new Observable<Paziente>();
    this.getMedicoByEmailObservable = new Observable<Medico>();
    this.paziente = new Paziente();

    console.log(history.state.pazienteEmail)
  }

  ngOnInit() {
    this.getAllMediciSubscription = this.medicoService.getAllMedici().subscribe();

    this.dataSubscription = this.dataService.data$.subscribe((value:string) => {
        this.emailPaziente = value
        this.getPazienteByEmailObservable = this.pazienteService.getPazienteByEmail(this.emailPaziente)
      }
    )

    if (this.paziente.isEmpty())
      this.paziente.setState(false);

    if (!this.paziente.isSet()) {
      this.paziente.nome = "Mario";
      this.paziente.cognome = "Giannini";
      this.paziente.email = "mario.giannini@paziente.it";
      this.paziente.password = "password123";
      this.paziente.CF = "GNNMRA02R05E335P";
      this.paziente.indirizzo.cap = "IS";
      this.paziente.indirizzo.città = "Pesche";
      this.citta = this.paziente.indirizzo.città;
      this.paziente.indirizzo.via = "Contrada Lappone";
      this.paziente.esenzione = true;
      this.paziente.medico = new Medico();
      this.paziente.medico.nome = "Victor Ivan";
      this.paziente.medico.cognome = "Conde";
      this.paziente.donatoreOrgani = false;
    }

  }

  ionViewWillEnter() {
    if (this.paziente.isSet()) {
      this.getPazienteByEmailObservable.subscribe((value:Paziente) =>{
        this.paziente = value
        this.citta = this.paziente.indirizzo.città;
      });
    }
  }

  routeToSettings() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("settings-security");
  }

  logout() {
    this.navCtrl.navigateRoot("login");
  }

  goToHome() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateBack("patient-home", { animated: false });
  }

  goToLogbook() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-logbook", { animated: false })
  }

  goToReservation() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-reservation", { animated: false })
  }

  goToSOS() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-sos", { animated: false });
  }
}
