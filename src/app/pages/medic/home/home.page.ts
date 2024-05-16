import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonNav,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Medico} from "../../../models/medico/Medico";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {TipologiaMedico} from "../../../models/medico/tipologia-medico";
import {Observable, Subscription} from "rxjs";
import {DataService} from "../../../services/data.service";
import {MedicoService} from "../../../services/MedicoService/medico.service";
import {Sesso} from "../../../models/person/sesso";

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
        IonIcon, IonImg, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonCard, IonCardHeader, IonCardTitle, IonFooter, IonItem],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomePage implements OnInit {
  protected medico: Medico;
  private getMedicoByEmailObservable!:Observable<Medico>
  private dataSubscription!:Subscription;
  private medicoEmail!:string;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private dataService:DataService,
    private medicoService:MedicoService
  ) {
    this.medico = new Medico();
  }

  ngOnInit() {
    this.dataSubscription = this.dataService.data$.subscribe((value:string) => {
        this.medicoEmail = value
        this.getMedicoByEmailObservable = this.medicoService.getMedicoByEmail(this.medicoEmail)
      }
    )

    if (this.medico.isEmpty())
      this.medico.setState(false);

    if (!this.medico.isSet()) {
      this.medico.isManager = true;
      this.medico.nome = "Victor";
      this.medico.cognome = "Conde";
      this.medico.sesso = Sesso.MASCHIO;
      this.medico.email = "victor.conde@medico.it";
      this.medico.password = "password123";
      this.medico.CF = "CNDVTR85D07E335W";
      this.medico.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
      this.medico.reparto = "Cardiologia";
      this.medico.ruolo = "Primario";
      this.medico.tipologiaMedico = TipologiaMedico.OSPEDALIERO;
    }
  }

  routeToSettings() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("settings-security");
  }

  logout() {
    this.navCtrl.navigateRoot("login");
  }

  goToHome() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateBack("medic-home", { animated: false });
  }

  goToNotifs() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPatients() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-patients", { animated: false });
  }
  ionViewWillEnter(){
    this.getMedicoByEmailObservable.subscribe((value:Medico) =>{
      this.medico = value
    });
  }

  protected readonly Sesso = Sesso;
}
