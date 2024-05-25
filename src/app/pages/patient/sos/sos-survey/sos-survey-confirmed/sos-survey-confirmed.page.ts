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
import {Triage} from "../../../../../models/triage/Triage";
import {Paziente} from "../../../../../models/paziente/Paziente";
import {PersonaService} from "../../../../../services/PersonaService/persona.service";
import {TriageService} from "../../../../../services/TriageService/triage.service";
import {CodiciTriage} from "../../../../../models/triage/codici-triage";

@Component({
  selector: 'app-sos-survey-confirmed',
  templateUrl: './sos-survey-confirmed.page.html',
  styleUrls: ['./sos-survey-confirmed.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, LottieComponent, IonText]
})
export class SosSurveyConfirmedPage implements OnInit {
  private paziente: Paziente;
  private latitude!: number;
  private longitude!: number;
  private codiceTriage: CodiciTriage;
  private isSendingRequest: boolean = false;
  private sentStatus: string = "";

  options: AnimationOptions = {
    path: '../../../assets/animations/hospital.json',
    loop: false,
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
  ) {
    this.paziente = personaService.getPersona();
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

  async sendRequest() {
    if (this.isSendingRequest)
      this.sentStatus = 'BUSY';

    this.isSendingRequest = true;

    let richiesta = new Triage();
    richiesta.id = 12345;
    richiesta.codice = this.codiceTriage;
    richiesta.paziente = this.paziente;

    try {
      await this.getCurrentLocation();

      richiesta.posizione.latitudine = this.latitude;
      richiesta.posizione.longitudine = this.longitude;

      this.triageService.addRichiestaOffline(this.paziente, richiesta);

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
      this.navCtrl.navigateBack("patient-home", { animated: false });
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
