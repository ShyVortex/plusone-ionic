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
import {Sesso} from "../../../models/persona/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {Paziente} from "../../../models/paziente/Paziente";

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
    private router: Router,
    private personaService: PersonaService,
    private dataService:DataService,
    private medicoService:MedicoService,
    private storageService: StorageService
  ) {
    this.medico = this.personaService.getPersona();

    if (!this.medico)
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

    if (!this.medico.isManager && !this.medico.isSet())
      this.medicoService.offlineSetMedico(this.medico);
  }

  ionViewWillEnter(){
    this.getMedicoByEmailObservable.subscribe((value:Medico) =>{
      this.medico = value
    });
  }

  routeToSettings() {
    this.personaService.setPersona(this.medico);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.personaService.setPersona(this.medico);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings-security");
  }

  logout() {
    if (!this.medico.isSet())
      this.storageService.cacheState(this.medico);
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

  protected readonly Sesso = Sesso;
  protected readonly TipologiaMedico = TipologiaMedico;
}
