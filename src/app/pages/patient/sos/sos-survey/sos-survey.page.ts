import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton, IonCol,
  IonContent,
  IonFooter, IonGrid,
  IonHeader,
  IonImg,
  IonLabel, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-sos-survey',
  templateUrl: './sos-survey.page.html',
  styleUrls: ['./sos-survey.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, IonRow, IonSelect, IonSelectOption, IonRadio, IonRadioGroup, IonText, IonGrid, IonCol]
})
export class SosSurveyPage implements OnInit {
  selectedValue: any;

  @ViewChild('wherePainRef') wherePainRef!: IonSelect;
  @ViewChild('painLevelRef') painLevelRef!: IonSelect;
  @ViewChild('radioYesRef') radioYesRef!: IonRadio;
  @ViewChild('radioNoRef') radioNoRef!: IonRadio;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  handleRadioChange(event: CustomEvent) {
    this.selectedValue = event.detail.value;
    console.log('Selected value:', this.selectedValue);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Compilare tutti i campi.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-sos");
  }

  checkFields(): boolean {
    if (this.wherePainRef.value != null && this.painLevelRef.value != null)
      return true;
    else
      return false;
  }

  routeToSurveyConfirmed() {
    if (this.checkFields()) {
      if (this.selectedValue === this.radioNoRef.value)
        this.navCtrl.navigateForward("patient-sos-survey-confirmed");
      else
        this.navCtrl.navigateForward("patient-sos-emergency");
    }
    else
      this.presentAlert();
  }

  goToHome() {
    this.navCtrl.navigateBack("patient-home", { animated: false });
  }

  goToLogbook() {
    this.navCtrl.navigateForward("patient-logbook", { animated: false });
  }

  goToReservation() {
    this.navCtrl.navigateForward("patient-reservation", { animated: false });
  }

  goToSOS() {
    this.navCtrl.navigateForward("patient-sos", { animated: false });
  }
}
