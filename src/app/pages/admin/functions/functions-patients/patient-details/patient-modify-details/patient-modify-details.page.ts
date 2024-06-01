/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabs, IonTabBar, IonTabButton, IonImg, IonLabel, IonButton, IonItem, IonInput, IonAlert } from '@ionic/angular/standalone';
import {AlertController, NavController} from "@ionic/angular";
import { StorageService } from 'src/app/services/StorageService/storage.service';
import {firstValueFrom} from "rxjs";
import {PazienteService} from "../../../../../../services/PazienteService/paziente.service";
import {Paziente} from "../../../../../../models/paziente/Paziente";
import {LoginUtilities} from "../../../../../registration/LoginUtilities";
import {HashingUtilities} from "../../../../../registration/hashing-utilities";

@Component({
  selector: 'app-patient-modify-details',
  templateUrl: './patient-modify-details.page.html',
  styleUrls: ['./patient-modify-details.page.scss'],
  standalone: true,
  imports: [IonAlert, IonInput, IonItem, IonButton, IonLabel, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PatientModifyDetailsPage implements OnInit {
  protected patient: Paziente;
  protected confirmButtons = [{
    text:'Annulla',
    role:'annulla',
    handler:()=> {

    }
  }, {
    text:'Conferma',
    role:'conferma',
    handler:async () => {
      await this.jsonFromPatient()
      await firstValueFrom(this.pazienteService.updatePaziente(this.patientJson,this.patient.id))

      this.navCtrl.navigateForward("admin-functions-patients", {animated: false});
    }
  }];
  protected deleteButtons = [{
    text:'Annulla',
    role:'annulla',
    handler:()=> {

    }
  }, {
    text:'Elimina',
    role:'elimina',
    handler:async () => {
      await firstValueFrom(this.pazienteService.deletePaziente(this.patient.id))

      this.navCtrl.navigateForward("admin-functions-patients", {animated: false});
    }
  }];
  protected emailToUpdate!:string;
  protected passwordToUpdate:string;
  protected passwordToMatch:string;
  private patientJson:any;
  protected alertButton =["OK"];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
    private pazienteService: PazienteService,
  ) {
    this.patient = this.storageService.getPaziente();
    this.passwordToMatch = ''
    this.passwordToUpdate = ''
    this.emailToUpdate = this.patient.email
    this.patientJson = {}
  }

  ngOnInit() {
  }
  async jsonFromPatient() {
    this.patientJson.id = this.patient.id;
    this.patientJson.nome = this.patient.nome
    this.patientJson.cognome = this.patient.cognome
    this.patientJson.email = this.emailToUpdate;
    this.patientJson.password = await HashingUtilities.HashPassword(this.passwordToUpdate)
    this.patientJson.indirizzo = {}
    this.patientJson.indirizzo.cap = this.patient.indirizzo.cap
    this.patientJson.indirizzo.via = this.patient.indirizzo.via
    this.patientJson.indirizzo.numeroCivico = this.patient.indirizzo.numeroCivico
    this.patientJson.indirizzo.città = this.patient.indirizzo.città
    this.patientJson.esenzione = this.patient.esenzione
    this.patientJson.donatoreOrgani = this.patient.donatoreOrgani
    this.patientJson.cf = this.patient.CF
  }

  navigateBack() {
    this.storageService.setPaziente(this.patient);
    this.navCtrl.navigateBack("admin-patient-details");
  }

  goToHome() {
    this.navCtrl.navigateForward("admin-home", { animated: false });
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
  async presentAlert() {

    if(this.isMatching() && (LoginUtilities.getRuoloByEmail(this.emailToUpdate)==="PAZIENTE")) {
      const alert = await this.alertController.create({
        header:"Conferma cambiamenti",
        message:"Sei sicuro di voler confermare le modifiche?",
        buttons:this.confirmButtons
      });
      await alert.present();
    }
    else {
      const alert = await this.alertController.create({
        header:"ERRORE",
        message:"le Password non corrispondono oppure l'email non è nel formato corretto",
        buttons:this.alertButton
      });
      await alert.present();
    }

  }
  isMatching():boolean{
    return (this.passwordToUpdate===this.passwordToMatch) && (this.passwordToMatch!='') && (this.passwordToUpdate!='');
  }
}
