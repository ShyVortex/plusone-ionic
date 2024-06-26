import {Component, OnInit} from '@angular/core';
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
import {Infermiere} from "../../../models/infermiere/Infermiere";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {Sesso} from "../../../models/persona/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {InfermiereService} from "../../../services/InfermiereService/infermiere.service";
import {Observable, Subscription} from "rxjs";
import {DataService} from "../../../services/data.service";
import {Medico} from "../../../models/medico/Medico";
import {LoginPage} from "../../registration/login/login.page";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonFooter, IonItem]
})

export class HomePage implements OnInit {
  protected infermiere: Infermiere;
  private infermiereEmail!:string;
  private getInfermiereByEmailObservable!:Observable<Infermiere>;
  private dataSubscription!: Subscription;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private infermiereService: InfermiereService,
    private storageService: StorageService,
    private dataService:DataService
  ) {
    this.infermiere = this.personaService.getPersona();

    if (!this.infermiere)
      this.infermiere = new Infermiere();
  }

  ngOnInit() {
    this.dataSubscription = this.dataService.data$.subscribe((value:string) => {
      this.infermiereEmail = value
      this.getInfermiereByEmailObservable = this.infermiereService.getInfermiereByEmail(this.infermiereEmail)
    })

    if (this.infermiere.nome === "" && this.personaService.isDefault())
      this.infermiereService.offlineSetInfermiere(this.infermiere);
  }

  routeToSettings() {
    this.personaService.setPersona(this.infermiere);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.personaService.setPersona(this.infermiere);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings-security");
  }

  async logout() {
    if (this.personaService.isDefault())
      this.storageService.cacheState(this.infermiere);

    await this.navCtrl.navigateRoot("login");
    LoginPage.canBypassToast = false;
  }

  goToHome() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateForward("nurse-home", { animated: false });
  }

  goToDrugs() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateForward("nurse-drugs", { animated: false });
  }

  goToShifts() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateForward("nurse-shifts", { animated: false });
  }

  goToSOS() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateForward("nurse-sos", { animated: false });
  }

  ionViewWillEnter(){
    this.getInfermiereByEmailObservable.subscribe((value:Infermiere) =>{
      this.infermiere = value
    });
  }

  protected readonly Sesso = Sesso;
}
