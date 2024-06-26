import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {Paziente} from "../../../../../models/paziente/Paziente";
import {Triage} from "../../../../../models/triage/Triage";
import {NavController} from "@ionic/angular";
import {StorageService} from "../../../../../services/StorageService/storage.service";
import {isEqual} from "lodash";
import {AnimationItem} from "lottie-web";
import {TriageService} from "../../../../../services/TriageService/triage.service";
import {Conferma} from "../../../../../models/triage/Conferma";

@Component({
  selector: 'app-sos-request-denied',
  templateUrl: './sos-request-denied.page.html',
  styleUrls: ['./sos-request-denied.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonText, LottieComponent]
})

export class SosRequestDeniedPage implements OnInit {
  private paziente!: Paziente;
  protected richiesta!: Triage;

  options: AnimationOptions = {
    path: '../../../assets/animations/error.json',
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

  ionViewWillEnter(){
    this.triageService.setState(this.richiesta.id,Conferma.NO).subscribe();
  }

  ionViewDidLeave() {
    if (!this.paziente.isSet()) {
      const index = this.paziente.richieste.findIndex((item) => item === this.richiesta);
      if (index !== -1) {
        if (isEqual(this.paziente.richieste[index], this.richiesta)) {
          this.paziente.richieste[index].conferma = Conferma.NO;
          console.log(`Request for ${this.richiesta.descrizione} by ${this.richiesta.paziente.nome}
           ${this.richiesta.paziente.cognome} has been denied.`);
        }
        else
          console.error('The request details do not match.');
      }
      else
        console.error('Request not found.');
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }

  goToSOSAnimated() {
    this.navCtrl.navigateBack("nurse-sos", { animated: true });
  }

  goToHome() {
    this.navCtrl.navigateForward("nurse-home", { animated: false });
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
}
