import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton, IonCol,
  IonContent,
  IonFooter, IonGrid,
  IonHeader,
  IonImg, IonItem,
  IonLabel, IonRadio, IonRadioGroup, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {CodiciTriage} from "../../../../models/triage/codici-triage";

@Component({
  selector: 'app-sos-survey',
  templateUrl: './sos-survey.page.html',
  styleUrls: ['./sos-survey.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonFooter, IonImg, IonLabel, IonTabBar, IonTabButton, IonTabs, IonRow, IonSelect, IonSelectOption, IonRadio, IonRadioGroup, IonText, IonGrid, IonCol, IonItem]
})
export class SosSurveyPage implements OnInit {
  codiceTriage: string = "";
  isPainSelectable: boolean = false;
  isCodiceVisible: boolean = false;

  @ViewChild('wherePainRef') wherePainRef!: IonSelect;
  @ViewChild('painLevelRef') painLevelRef!: IonSelect;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
  }

  async showAlert() {
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

  unlockPainLevel() {
    this.isPainSelectable = true;
  }

  updateAccessCode(event: CustomEvent) {
    this.isCodiceVisible = true;

    if (event.detail.value === "Minimo")
      this.codiceTriage = CodiciTriage.BIANCO;
    else if (event.detail.value === "Lieve")
      this.codiceTriage = CodiciTriage.VERDE;
    else if (event.detail.value === "Sofferto")
      this.codiceTriage = CodiciTriage.AZZURRO;
    else if (event.detail.value === "A rischio")
      this.codiceTriage = CodiciTriage.ARANCIONE;
  }

  routeToSurveyConfirmed() {
    if (this.checkFields()) {
      if (this.codiceTriage != CodiciTriage.ARANCIONE)
        this.navCtrl.navigateForward("patient-sos-survey-confirmed", {
          state: {
            codiceTriage: this.codiceTriage
          }
        });
      else
        this.navCtrl.navigateForward("patient-sos-emergency", {
          state: {
            codiceTriage: this.codiceTriage
          }
        });
    }
    else
      this.showAlert();
  }

  goToHome() {
    this.navCtrl.navigateForward("patient-home", { animated: false });
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

  protected readonly CodiciTriage = CodiciTriage;
}
