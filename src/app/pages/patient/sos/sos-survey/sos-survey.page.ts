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
  protected isFirstSelectable: boolean = false;
  protected isSecondSelectable: boolean = false;
  protected isCodiceVisible: boolean = false;
  private dangerPercentage: number;

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
  ) {
    this.dangerPercentage = 0;
  }

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

  unlockFirstQuestion() {
    this.isFirstSelectable = true;
    this.isSecondSelectable = false;
    if (this.isCodiceVisible)
      this.isCodiceVisible = false;
  }

  unlockSecondQuestion() {
    this.isSecondSelectable = true;
    if (this.isCodiceVisible)
      this.updateAccessCode();
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

  updateDangerValue() {
    if (this.testaFirstRef) {
      this.dangerPercentage += 20;

      switch (this.testaFirstRef.value) {
        case 'Poco':
          this.dangerPercentage += 5;
          break;
        case 'Abbastanza':
          this.dangerPercentage += 20;
          break;
        case 'Molto':
          this.dangerPercentage += 30;
          break;
      }

      switch (this.testaSecondRef.value) {
        case 'Specifico':
          this.dangerPercentage += 15;
          break;
        case 'Diffuso':
          this.dangerPercentage += 35;
      }
    }

    else if (this.bracciaFirstRef) {
      this.dangerPercentage += 10;

      switch (this.bracciaFirstRef.value) {
        case 'Si, con il movimento':
          this.dangerPercentage += 15;
          break;
        case 'Si, a riposo':
          this.dangerPercentage += 15;
          break;
        case 'In entrambi i casi':
          this.dangerPercentage += 30;
          break;
        case 'No, è indifferente':
          this.dangerPercentage += 5;
          break;
      }

      switch (this.bracciaSecondRef.value) {
        case 'Si':
          this.dangerPercentage += 50;
          break;
        case 'No':
          this.dangerPercentage += 25;
          break;
      }
    }

    else if (this.pettoFirstRef) {
      this.dangerPercentage += 25;

      switch (this.pettoFirstRef.value) {
        case 'Costante':
          this.dangerPercentage += 25;
          break;
        case 'Intermittente':
          this.dangerPercentage += 15;
          break;
      }

      switch (this.pettoSecondRef.value) {
        case 'Solo nel petto':
          this.dangerPercentage += 25;
          break;
        case 'Anche alle braccia':
          this.dangerPercentage += 50;
          break;
        case 'Anche alla mascella':
          this.dangerPercentage += 50;
          break;
        case 'Altro':
          this.dangerPercentage += 35;
          break;
      }
    }

    else if (this.stomacoFirstRef) {
      this.dangerPercentage += 20;

      switch (this.stomacoFirstRef.value) {
        case 'Si':
          this.dangerPercentage += 20;
          break;
        case 'No':
          this.dangerPercentage += 10;
          break;
      }

      switch (this.stomacoSecondRef.value) {
        case 'Si, dopo mangiato':
          this.dangerPercentage += 30;
          break;
        case 'Si, a stomaco vuoto':
          this.dangerPercentage += 45;
          break;
        case 'No':
          this.dangerPercentage += 10;
          break;
      }
    }

    else if (this.ossaFirstRef) {
      this.dangerPercentage += 25;

      switch (this.ossaFirstRef.value) {
        case 'Si':
          this.dangerPercentage += 25;
          break;
        case 'No':
          this.dangerPercentage += 15;
          break;
      }

      switch (this.ossaSecondRef.value) {
        case 'Si':
          this.dangerPercentage += 25;
          break;
        case 'No':
          this.dangerPercentage += 5;
          break;
      }
    }

    else if (this.gambeFirstRef) {
      this.dangerPercentage += 25;

      switch (this.gambeFirstRef.value) {
        case 'Si, durante il cammino o corsa':
          this.dangerPercentage += 20;
          break;
        case 'Si, a riposo':
          this.dangerPercentage += 35;
          break;
        case 'No':
          this.dangerPercentage += 10;
          break;
      }

      switch (this.gambeSecondRef.value) {
        case 'Si':
          this.dangerPercentage += 20;
          break;
        case 'No':
          this.dangerPercentage += 10;
          break;
      }
    }
  }

  updateAccessCode() {
    if (this.dangerPercentage !== 0)
      this.dangerPercentage = 0;

    this.updateDangerValue();
    this.isCodiceVisible = true;

    if (this.dangerPercentage <= 25)
      this.codiceTriage = CodiciTriage.BIANCO;
    else if (this.dangerPercentage > 25 && this.dangerPercentage <= 50)
      this.codiceTriage = CodiciTriage.VERDE;
    else if (this.dangerPercentage > 50 && this.dangerPercentage <= 75)
      this.codiceTriage = CodiciTriage.AZZURRO;
    else if (this.dangerPercentage > 75 && this.dangerPercentage <= 100)
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
