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
import {Sesso} from "../../../models/person/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonFooter, IonItem]
})
export class HomePage implements OnInit {
  protected infermiere: Infermiere;

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private storageService: StorageService
  ) {
    this.infermiere = new Infermiere();
  }

  ngOnInit() {
    if (this.infermiere.isEmpty())
      this.infermiere.setState(false);

    if (!this.infermiere.isSet())
      this.offlineSetInfermiere();
  }

  offlineSetInfermiere() {
    this.infermiere.nome = "Teresa";
    this.infermiere.cognome = "Nucci";
    this.infermiere.sesso = Sesso.FEMMINA;
    this.infermiere.email = "teresa.nucci@infermiere.it";
    this.infermiere.password = "password123";
    this.infermiere.CF = "NCCTRS81M16B519G";
    this.infermiere.ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
    this.infermiere.reparto = "Chirurgia";
    this.infermiere.ruolo = "Infermiere assistente";
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

  logout() {
    this.navCtrl.navigateRoot("login");
  }

  goToHome() {
    this.personaService.setPersona(this.infermiere);
    this.navCtrl.navigateBack("nurse-home", { animated: false });
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

  protected readonly Sesso = Sesso;
}
