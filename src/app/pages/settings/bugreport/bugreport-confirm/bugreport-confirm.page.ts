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
import {NavController} from "@ionic/angular";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-bugreport-confirm',
  templateUrl: './bugreport-confirm.page.html',
  styleUrls: ['./bugreport-confirm.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, LottieComponent, IonText]
})
export class BugreportConfirmPage implements OnInit {
  protected ruolo: String;

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

  constructor(private navCtrl: NavController) {
    console.log(this.ruolo = history.state.ruolo);
  }

  ngOnInit() {}

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }

  goToHomeAnimated() {
    if (this.ruolo === 'PAZIENTE')
      this.navCtrl.navigateBack("patient-home", { animated: true });
    else if (this.ruolo === 'INFERMIERE')
      this.navCtrl.navigateBack("nurse-home", { animated: true });
    else if (this.ruolo === 'MEDICO')
      this.navCtrl.navigateBack("medic-home", { animated: true });
    else if (this.ruolo === 'ADMIN')
      this.navCtrl.navigateBack("admin-home", { animated: true });
  }

  goToHome() {
    if (this.ruolo === 'PAZIENTE')
      this.navCtrl.navigateBack("patient-home");
    else if (this.ruolo === 'INFERMIERE')
      this.navCtrl.navigateBack("nurse-home");
    else if (this.ruolo === 'MEDICO')
      this.navCtrl.navigateBack("patient-home");
    else if (this.ruolo === 'ADMIN')
      this.navCtrl.navigateBack("admin-home");
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
