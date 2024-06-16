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
import {Sesso} from "../../../models/persona/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {LoginPage} from "../../registration/login/login.page";

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
  protected paziente: Paziente = new Paziente();
  private getPazienteByEmailObservable:Observable<Paziente>;
  private getMedicoOfPazienteObservable:Observable<Medico>
  private emailPaziente!:string
  protected citta! :string
  protected medicOfPatient! :Medico
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
    if (personaService.getPersona() !== undefined)
      this.paziente = personaService.getPersona();

    /* Chiamato per risolvere un freeze dell'applicazione ottenibile seguendo questa sequenza di passi:
    1. Logga come paziente di default
    2. Invia segnalazione errori
    3. Logga in admin e segna come risolta la segnalazione
    4. Logga come paziente reale presente sul database

    Tuttavia, questo metodo non influisce sul login con account reale dato che vengono eseguite le azioni
    in ngOnInit() ed ionViewWillEnter() che sovrascrivono il risultato di questo metodo.
     */
    pazienteService.offlineSetPaziente(this.paziente);

    this.getAllMediciSubscription = new Subscription();
    this.getPazienteByEmailObservable = new Observable<Paziente>();
    this.getMedicoByEmailObservable = new Observable<Medico>();
    this.getMedicoOfPazienteObservable = new Observable<Medico>()

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
  }

  ionViewWillEnter() {
    this.getPazienteByEmailObservable.subscribe((value:Paziente) => {
      this.paziente = value;
      this.getMedicoOfPazienteObservable = this.pazienteService.getMedicoOfPaziente(this.paziente.id as unknown as string);
      this.citta = this.paziente.indirizzo.città;
      if (this.paziente.nome === "" && this.personaService.isDefault()) {
        this.pazienteService.offlineSetPaziente(this.paziente);
        this.citta = this.paziente.indirizzo.città;
        this.paziente.terapie = this.storageService.getTerapie();
        this.paziente.tFarmacologiche = this.storageService.getTFarmacologiche();
      }
    });
  }

  ionViewDidEnter(){
    this.getMedicoOfPazienteObservable.subscribe((value:Medico) => {
      this.medicOfPatient = value;
      this.storageService.setMedico(this.medicOfPatient)
    })
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

  async logout() {
    if (this.personaService.isDefault())
      this.storageService.cacheState(this.paziente);

    await this.navCtrl.navigateRoot("login");
    LoginPage.canBypassToast = false;
  }

  goToHome() {
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-home", { animated: false });
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
    this.storageService.setPaziente(this.paziente);
    this.personaService.setPersona(this.paziente);
    this.navCtrl.navigateForward("patient-sos", { animated: false });
  }

  protected readonly Sesso = Sesso;
}
