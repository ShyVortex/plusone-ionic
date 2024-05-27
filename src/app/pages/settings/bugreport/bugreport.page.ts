import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton, IonCol,
  IonContent, IonFooter, IonGrid,
  IonHeader,
  IonIcon,
  IonImg, IonLabel, IonRow, IonSelect, IonSelectOption,
  IonTabBar,
  IonTabButton, IonTabs, IonText, IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {LoginUtilities} from "../../registration/login/LoginUtilities";
import {PersonaService} from "../../../services/PersonaService/persona.service";

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.page.html',
  styleUrls: ['./bugreport.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonSelect, IonSelectOption, IonCol, IonGrid, IonFooter]
})

export class BugreportPage implements OnInit {
  protected persona: any;
  protected ruolo: String;
  protected readonly LoginUtilities = LoginUtilities;

  @ViewChild('reportSelectRef') reportSelectRef!: IonSelect;
  @ViewChild('reportAreaRef') reportAreaRef!: IonTextarea;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private alertController: AlertController,
  ) {
    this.persona = personaService.getPersona();
    this.ruolo = "";
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Compilare tutti i campi.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  navigateBack() {
    this.navCtrl.back();
  }

  onReset() {
    this.reportAreaRef.value = "";
  }

  onConfirm() {
    // @ts-ignore
    if (this.reportSelectRef.value != null && this.reportAreaRef.value.length > 0)
      this.navCtrl.navigateForward("settings-bugreport-confirm");
    else
      this.presentAlert();
  }

  goToHome() {
    if (this.ruolo === 'PAZIENTE')
      this.navCtrl.navigateBack("patient-home");
    else if (this.ruolo === 'INFERMIERE')
      this.navCtrl.navigateBack("nurse-home");
    else if (this.ruolo === 'MEDICO')
      this.navCtrl.navigateBack("patient-home");
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

  goToPrescriptions() {
    this.navCtrl.navigateForward("medic-prescriptions", { animated: false });
  }

  goToFunctions() {
    this.navCtrl.navigateForward("admin-functions", { animated: false });
  }
}
