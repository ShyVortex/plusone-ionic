import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton,
  IonCol,
  IonContent, IonFooter,
  IonGrid,
  IonHeader,
  IonImg, IonItem, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonText, IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {LoginUtilities} from "../../registration/login/LoginUtilities";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {firstValueFrom} from "rxjs";
import {HashingUtilities} from "../../registration/hashing-utilities";

@Component({
  selector: 'app-security',
  templateUrl: './security.page.html',
  styleUrls: ['./security.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonCol, IonGrid, IonImg, IonLabel, IonRow, IonSelect, IonSelectOption, IonTabBar, IonTabButton, IonTabs, IonTextarea, IonItem, IonFooter, IonText]
})

export class SecurityPage implements OnInit {
  protected persona: any;
  protected ruolo: String;
  protected passwordArea: string = "";
  protected editableMail: boolean = false;
  protected editablePass: boolean = false;
  protected readonly LoginUtilities = LoginUtilities;
  private hashedPassword:any
  private password!:any

  /* Il punto esclamativo assicura a
  Ionic che la variabile sarà inizializzata prima dell'utilizzo */
  @ViewChild('passwordAreaRef') passwordAreaRef!: IonTextarea;
  @ViewChild('confirmPassRef') confirmPassRef!: IonTextarea;

  protected confirmButtons = [
    {
      text: 'Annulla',
      role: 'cancel',
      handler: () => {}
    },
    {
      text: 'Conferma',
      role: 'confirm',
      handler: async () => {
       try{
         this.hashedPassword.hashedPassword = await HashingUtilities.HashPassword(this.password)
         console.log(this.hashedPassword.hashedPassword)
         await firstValueFrom(this.personaService.updatePersonaPassword(this.persona.id,this.hashedPassword))
         this.goToHome()
       }
       catch (error){
         console.log('error', error)
       }
      }
    }
  ];

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private cdr: ChangeDetectorRef,
    private alertController:AlertController
  ) {
    this.persona = personaService.getPersona();
    this.ruolo = "";
    this.hashedPassword = {}
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

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Le due password non corrispondono.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Conferma',
      message: 'Confermare il cambiamento di password?',
      buttons: this.confirmButtons,
    });

    await alert.present();
  }

  navigateBack() {
    this.navCtrl.back();
  }

  async editPassword() {
    this.editablePass = true;
    this.passwordAreaRef.value = "";
    this.cdr.detectChanges();
  }

  async cancelEditPassword() {
    this.passwordAreaRef.value = "........";
    this.editablePass = false;
    this.cdr.detectChanges();
  }

  async confirmPassword() {
      if(this.isMatching()){
        this.password =  this.confirmPassRef.value
        this.presentConfirmAlert()
      }
      else {
        this.presentErrorAlert();
      }
  }

  isDisable() :boolean{
    return this.passwordAreaRef.value == '' || this.passwordAreaRef.value == undefined || this.confirmPassRef.value == "" || this.confirmPassRef.value == undefined;
  }

  isMatching() :boolean{
    return this.passwordAreaRef.value === this.confirmPassRef.value
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
