import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonLabel, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AlertController, NavController} from "@ionic/angular";
import {AnimationItem} from "lottie-web";
import {Geolocation} from "@capacitor/geolocation";
import {Triage} from "../../../../models/triage/Triage";
import {CodiciTriage} from "../../../../models/triage/codici-triage";
import {PersonaService} from "../../../../services/PersonaService/persona.service";
import {TriageService} from "../../../../services/TriageService/triage.service";
import {Paziente} from "../../../../models/paziente/Paziente";
import {waitForAsync} from "@angular/core/testing";
import {StorageService} from "../../../../services/StorageService/storage.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-sos-emergency',
  templateUrl: './sos-emergency.page.html',
  styleUrls: ['./sos-emergency.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, LottieComponent, IonText]
})
export class SosEmergencyPage implements OnInit {
  private paziente: Paziente;
  private latitude!: number;
  private longitude!: number;
  private codiceTriage: CodiciTriage;
  private isSendingRequest: boolean = false;
  private sentStatus: string = "";
  private richiesta: any = {}

  options: AnimationOptions = {
    path: '../../../assets/animations/ambulance.json',
    loop: true,
  };

  styles: Partial<CSSStyleDeclaration> = {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-3em',
    marginBottom: '-4em',
    height: '26em',
  }

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private personaService: PersonaService,
    private triageService: TriageService,
    private storageService: StorageService
  ) {
    this.paziente = this.personaService.getPersona();
    console.log(this.codiceTriage = history.state.codiceTriage);
  }

  ngOnInit() {
    console.clear();
    this.getCurrentLocation();
    this.sendRequest();
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Attendi l\'invio della posizione.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      console.log('Latitudine:', this.latitude, 'Longitudine:', this.longitude);
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  setRichiesta(): void {
    this.richiesta.colore = this.codiceTriage;
    this.richiesta.latitudine = this.latitude;
    this.richiesta.longitudine = this.longitude;
    this.richiesta.descrizione = "EMERGENZA"
    this.richiesta.conferma = "IN_ATTESA";
    if (this.personaService.isDefault()) {
      this.richiesta.codice = this.richiesta.colore;
      this.richiesta.id = 0;
      this.richiesta.paziente = this.paziente;
    }
  }

  async sendRequest() {
    if (this.isSendingRequest)
      this.sentStatus = 'BUSY';

    this.isSendingRequest = true;

    try {
      await this.getCurrentLocation();
      this.setRichiesta()

      if (!this.personaService.isDefault())
        await firstValueFrom(this.triageService.addTriage(this.paziente.id, this.richiesta))
      else
        this.triageService.addRichiestaOffline(this.paziente, this.richiesta);

      this.sentStatus = 'OK';

    } catch (error) {
      console.log(error);
      this.sentStatus = 'ERROR';
    } finally {
      this.isSendingRequest = false;
    }
  }

  async goToHomeAnimated() {
    if (this.sentStatus === 'OK') {
      this.personaService.setPersona(this.paziente);
      this.navCtrl.navigateBack("patient-home", { animated: true });
    } else
      await this.showAlert();
  }

  async goToHome() {
    if (this.sentStatus === 'OK') {
      this.personaService.setPersona(this.paziente);
      this.navCtrl.navigateForward("patient-home", { animated: false });
    } else
      await this.showAlert();
  }

  async goToLogbook() {
    if (this.sentStatus === 'OK') {
      this.personaService.setPersona(this.paziente);
      this.navCtrl.navigateForward("patient-logbook", { animated: false });
    } else
      await this.showAlert();
  }

  async goToReservation() {
    if (this.sentStatus === 'OK') {
      this.personaService.setPersona(this.paziente);
      this.navCtrl.navigateForward("patient-reservation", { animated: false });
    } else
      this.showAlert();
  }

  async goToSOS() {
    if (this.sentStatus === 'OK') {
      this.personaService.setPersona(this.paziente);
      this.navCtrl.navigateForward("patient-sos",{ animated: false });
    } else
      this.showAlert();
  }
}
