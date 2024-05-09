import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonCol,
    IonContent, IonFooter,
    IonGrid,
    IonHeader,
    IonImg, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonTextarea,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {LoginUtilities} from "../../registration/login/LoginUtilities";
import {PersonaService} from "../../../services/PersonaService/persona.service";

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonImg, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonTextarea, IonItem, IonFooter]
})
export class SecurityPage implements OnInit {
  protected persona: any;
  protected ruolo: String;
  protected passwordArea: string = "";
  protected editableMail: boolean = false;
  protected editablePass: boolean = false;
  protected readonly LoginUtilities = LoginUtilities;

  /* Il punto esclamativo assicura a
  Ionic che la variabile sarà inizializzata prima dell'utilizzo */
  @ViewChild('emailAreaRef') emailAreaRef!: IonTextarea;
  @ViewChild('passwordAreaRef') passwordAreaRef!: IonTextarea;
  @ViewChild('confirmPassRef') confirmPassRef!: IonTextarea;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService
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
  }

  navigateBack() {
    this.navCtrl.navigateBack("settings");
  }

  async editEmail() {
    this.editableMail = true;
    this.emailAreaRef.value = "";
    this.emailAreaRef.readonly = false;
  }

  editPassword() {
    this.editablePass = true;
    this.passwordAreaRef.value = "";
    this.passwordAreaRef.readonly = false;
  }

  async cancelEditEmail() {
    this.emailAreaRef.value = this.persona.email;
    this.emailAreaRef.readonly = true;
    this.editableMail = false;
  }

  async confirmEditEmail() {

  }

  async cancelEditPassword() {
    this.passwordAreaRef.value = "........";
    this.passwordAreaRef.readonly = true;
    this.editablePass = false;
  }

  async confirmEditPassword() {

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
}
