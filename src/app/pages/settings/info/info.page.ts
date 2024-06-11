import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader,
    IonImg, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonText, IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { LoginUtilities } from "../../registration/login/LoginUtilities";
import { PersonaService } from "../../../services/PersonaService/persona.service";
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { trashBinSharp } from 'ionicons/icons';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: true,
    imports: [LottieComponent, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonImg, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonTextarea, IonText, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardTitle]
})

export class InfoPage implements OnInit {
  protected persona: any;
  protected ruolo: String;
  protected readonly LoginUtilities = LoginUtilities;
  protected clicks: number;
  protected overlayVisible!: boolean;
  protected anim: any;

  options: AnimationOptions = {
  path: '../../../assets/animations/unimol-spinner.json',
    autoplay: false,
  };

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService
  ) {
    this.persona = personaService.getPersona();
    this.ruolo = "";
    this.clicks = 0;
    this.overlayVisible = false;
  }

  ngOnInit() {
    if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'PAZIENTE')
      this.ruolo = "PAZIENTE";
    else if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'INFERMIERE')
      this.ruolo = "INFERMIERE";
    else if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'MEDICO')
      this.ruolo = "MEDICO";
    else if (LoginUtilities.getRuoloByEmail(this.persona.email) === 'ADMIN')
      this.ruolo = "ADMIN";
  }

  showOverlay() {
    this.overlayVisible = true;
    setTimeout(() => {
      this.anim.play();
    }, 500);
  }

  hideOverlay() {
    this.anim.goToAndStop(0, true);
    this.overlayVisible = false;
    this.clicks = 0;
  }

  handleAnimation(anim: any) {
    this.anim = anim;
  }

  displayEasterEgg() {
    this.clicks++;
    if (this.clicks === 3) {
      this.showOverlay();
    }
  }

  navigateBack() {
    this.navCtrl.back();
  }

  goToHome() {
    if (this.ruolo === 'PAZIENTE')
      this.navCtrl.navigateForward("patient-home");
    else if (this.ruolo === 'INFERMIERE')
      this.navCtrl.navigateForward("nurse-home");
    else if (this.ruolo === 'MEDICO')
      this.navCtrl.navigateForward("medic-home");
    else if (this.ruolo === 'ADMIN')
      this.navCtrl.navigateForward("admin-home");
  }

  goToLogbook() {
    this.navCtrl.navigateForward("patient-logbook", { animated: false });
  }

  goToReservation() {
    this.navCtrl.navigateForward("patient-reservation", { animated: false });
  }

  goToPatientSOS() {
    this.navCtrl.navigateForward("patient-sos", { animated: false });
  }

  goToDrugs() {
    this.navCtrl.navigateForward("nurse-drugs", { animated: false });
  }

  goToShifts() {
    this.navCtrl.navigateForward("nurse-shifts", { animated: false });
  }

  goToNurseSOS() {
    this.navCtrl.navigateForward("nurse-sos", { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPatients() {
    this.navCtrl.navigateForward("medic-patients", { animated: false });
  }

  goToRequests() {
    this.navCtrl.navigateForward("admin-requests", { animated: false });
  }

  goToFunctions() {
    this.navCtrl.navigateForward("admin-functions", { animated: false });
  }

  goToReports() {
    this.navCtrl.navigateForward("admin-reports", { animated: false });
  }
}
