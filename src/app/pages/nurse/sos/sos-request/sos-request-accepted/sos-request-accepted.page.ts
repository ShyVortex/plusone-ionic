import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader, IonImg,
  IonLabel, IonTabBar, IonTabButton, IonTabs,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {Triage} from "../../../../../models/triage/Triage";
import {NavController} from "@ionic/angular";
import {StorageService} from "../../../../../services/StorageService/storage.service";
import {Paziente} from "../../../../../models/paziente/Paziente";
import {isEqual} from "lodash";
import {TriageService} from "../../../../../services/TriageService/triage.service";
import {Conferma} from "../../../../../models/triage/Conferma";

@Component({
  selector: 'app-sos-request-accepted',
  templateUrl: './sos-request-accepted.page.html',
  styleUrls: ['./sos-request-accepted.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonText, LottieComponent, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs]
})

export class SosRequestAcceptedPage implements OnInit {
  private paziente!: Paziente;
  protected richiesta!: Triage;

  options: AnimationOptions = {
    path: '../../../assets/animations/green-check.json',
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
    private storageService: StorageService,
    private triageService:TriageService
  ) {

  }

  ngOnInit() {
    this.richiesta = this.storageService.getTriage();
    this.paziente = this.richiesta.paziente;

  }

  ionViewDidLeave() {

    /*
    const index = this.paziente.richieste.findIndex((item) => item === this.richiesta);
    if (index !== -1) {
      if (isEqual(this.paziente.richieste[index], this.richiesta)) {
        // splice === rimuovi
        this.paziente.richieste.splice(index, 1);
        console.log(`Request for ${this.richiesta} has been cancelled.`);
      }
      else
        console.error('The reservation details do not match.');
    }
    else
      console.error('Reservation not found.');

     */
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }

  goToSOSAnimated() {
    this.navCtrl.navigateBack("nurse-sos", { animated: true });
  }

  goToHome() {
    this.navCtrl.navigateBack("nurse-home", { animated: false });
  }

  goToDrugs() {
    this.navCtrl.navigateForward("nurse-drugs", { animated: false });
  }

  goToShifts() {
    this.navCtrl.navigateForward("nurse-shifts", { animated: false });
  }

  goToSOS() {
    this.navCtrl.navigateForward("nurse-sos", { animated: false });
  }
  ionViewWillEnter(){
    this.triageService.setState(this.richiesta.id,Conferma.SI).subscribe()
  }
}
