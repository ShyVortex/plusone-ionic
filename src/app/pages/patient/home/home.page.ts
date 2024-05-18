import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
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
import {PazienteService} from "../../../services/PazienteService/paziente.service";
import {MedicoService} from "../../../services/MedicoService/medico.service";
import {Observable, Subscription} from "rxjs";
import {Paziente} from "../../../models/paziente/Paziente";
import {Medico} from "../../../models/medico/Medico";
import {DataService} from "../../../services/data.service";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {Sesso} from "../../../models/person/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {routes} from "../../../app.routes";
import {Router} from "@angular/router";
import {TipologiaMedico} from "../../../models/medico/tipologia-medico";

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
    private router: Router,
    private personaService:PersonaService,
    private pazienteService:PazienteService,
    private medicoService:MedicoService,
    private dataService: DataService,
    private storageService: StorageService
  ) {
    this.getAllMediciSubscription = new Subscription();
    this.getPazienteByEmailObservable = new Observable<Paziente>();
    this.getMedicoByEmailObservable = new Observable<Medico>();
    this.paziente = new Paziente();

    console.log(history.state.pazienteEmail)
    console.log(router.url);
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

    if (!this.paziente.isSet())
      this.offlineSetPaziente();
  }

  ionViewWillEnter() {
    if (this.paziente.isSet()) {
      this.getPazienteByEmailObservable.subscribe((value:Paziente) =>{
        this.paziente = value
        this.citta = this.paziente.indirizzo.città;
      });
    }
  }

  offlineSetPaziente() {
    this.paziente.nome = "Mario";
    this.paziente.cognome = "Giannini";
    this.paziente.sesso = Sesso.MASCHIO;
    this.paziente.email = "mario.giannini@paziente.it";
    this.paziente.password = "password123";
    this.paziente.CF = "GNNMRA02R05E335P";
    this.paziente.indirizzo.cap = "IS";
    this.paziente.indirizzo.città = "Pesche";
    this.citta = this.paziente.indirizzo.città;
    this.paziente.indirizzo.via = "Contrada Lappone";
    this.paziente.esenzione = true;
    this.paziente.medico = this.offlineSetMedicoCurante();
    this.paziente.donatoreOrgani = false;
  }

  offlineSetMedicoCurante(): Medico {
    let medico = new Medico();

    medico.isManager = true;
    medico.nome = "Victor";
    medico.cognome = "Conde";
    medico.sesso = Sesso.MASCHIO;
    medico.email = "victor.conde@medico.it";
    medico.password = "password123";
    medico.CF = "CNDVTR85D07E335W";
    medico.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
    medico.reparto = "Cardiologia";
    medico.ruolo = "Primario";
    medico.tipologiaMedico = TipologiaMedico.DI_BASE;

    return medico;
  }

  routeToSettings() {
    this.personaService.setPersona(this.paziente);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.personaService.setPersona(this.paziente);
    this.storageService.setRoute(this.router.url);
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

  protected readonly Sesso = Sesso;
}
