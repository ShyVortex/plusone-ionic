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
  protected codiceTriage: string = "";
  protected isPainSelectable: boolean = false;
  protected isCodiceVisible: boolean = false;

  @ViewChild('wherePainRef') wherePainRef!: IonSelect;
  @ViewChild('testaFirstRef') testaFirstRef!: IonSelect;
  @ViewChild('testaSecondRef') testaSecondRef!: IonSelect;
  @ViewChild('bracciaFirstRef') bracciaFirstRef!: IonSelect;
  @ViewChild('bracciaSecondRef') bracciaSecondRef!: IonSelect;
  @ViewChild('pettoFirstRef') pettoFirstRef!: IonSelect;
  @ViewChild('pettoSecondRef') pettoSecondRef!: IonSelect;
  @ViewChild('stomacoFirstRef') stomacoFirstRef!: IonSelect;
  @ViewChild('stomacoSecondRef') stomacoSecondRef!: IonSelect;
  @ViewChild('ossaFirstRef') ossaFirstRef!: IonSelect;
  @ViewChild('ossaSecondRef') ossaSecondRef!: IonSelect;
  @ViewChild('gambeFirstRef') gambeFirstRef!: IonSelect;
  @ViewChild('gambeSecondRef') gambeSecondRef!: IonSelect;

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
    if (this.wherePainRef && this.wherePainRef.value != null)
      return true;
    else
      return false;
  }

  checkFormComplete() {
    if (this.checkFields()) {
      // case 1: DOLORE ALLA TESTA
      if (
        (this.testaFirstRef && this.testaFirstRef.value != null) &&
        (this.testaSecondRef && this.testaSecondRef.value != null)
      )
        return true;

      // case 2: DOLORE ALLE BRACCIA
      else if (
        (this.bracciaFirstRef && this.bracciaFirstRef.value != null) &&
        (this.bracciaSecondRef && this.bracciaSecondRef.value != null)
      )
        return true;

      // case 3: DOLORE AL PETTO
      else if (
        (this.pettoFirstRef && this.pettoFirstRef.value != null)
        && (this.pettoSecondRef && this.pettoSecondRef.value != null)
      )
        return true;

      // case 4: DOLORE ALLO STOMACO
      else if (
        (this.stomacoFirstRef && this.stomacoFirstRef.value != null) &&
        (this.stomacoSecondRef && this.stomacoSecondRef.value != null)
      )
        return true;

      // case 5: DOLORE ALLE OSSA
      else if (
        (this.ossaFirstRef && this.ossaFirstRef.value != null) &&
        (this.ossaSecondRef && this.ossaSecondRef.value != null)
      )
        return true;

      // case 6: DOLORE ALLE GAMBE
      else if (
        (this.gambeFirstRef && this.gambeFirstRef.value != null) &&
        (this.gambeSecondRef && this.gambeSecondRef.value != null)
      )
        return true;

      // default
      return false;
    }
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
    if (this.checkFormComplete()) {
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
