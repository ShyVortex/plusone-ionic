/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonImg,
  IonLabel,
  IonButton,
  IonItem,
  IonInput,
  IonAlert,
  IonRow, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
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
  imports: [IonAlert, IonInput, IonItem, IonButton, IonLabel, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonSelect, IonSelectOption]
})
export class PatientModifyDetailsPage implements OnInit {
  protected patient: Paziente;
  protected confirmButtons = [{
    text:'Annulla',
    role:'annulla',
    handler:()=> {}
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
    handler:()=> {}
  }, {
    text:'Elimina',
    role:'elimina',
    handler:async () => {
      await firstValueFrom(this.pazienteService.deletePaziente(this.patient.id))

      this.navCtrl.navigateForward("admin-functions-patients", {animated: false});
    }
  }];

  protected citta: string;
  protected nameToUpdate: string;
  protected surnameToUpdate: string;
  protected genderToUpdate!: string;
  protected cityToUpdate: string;
  protected CAPToUpdate: string;
  protected streetToUpdate: string;
  protected civicNumberToUpdate: string;
  protected exemptionToUpdate: string;
  protected donorToUpdate: string;
  //protected medicToUpdate: string;
  protected activeState: string;
  private patientJson: any;
  protected alertButton= ["OK"];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
    private pazienteService: PazienteService,
  ) {
    this.patient = this.storageService.getPaziente();
    this.citta = this.patient.indirizzo.città;
    this.nameToUpdate = this.patient.nome;
    this.surnameToUpdate = this.patient.cognome;
    this.cityToUpdate = this.citta;
    this.CAPToUpdate = this.patient.indirizzo.cap;
    this.streetToUpdate = this.patient.indirizzo.via;
    this.civicNumberToUpdate = this.patient.indirizzo.numeroCivico;
    this.exemptionToUpdate = this.patient.esenzione.toString();
    this.donorToUpdate = this.patient.donatoreOrgani.toString();
    //this.medicToUpdate = this.patient.medico.nome + " " + this.patient.medico.cognome;
    this.activeState = this.patient.attivo.toString();
    this.patientJson = {};
  }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header:"Conferma cambiamenti",
      message:"Sei sicuro di voler confermare le modifiche?",
      buttons:this.confirmButtons
    });
    await alert.present();
  }

  async jsonFromPatient() {
    this.patientJson.id = this.patient.id;
    this.patientJson.nome = this.nameToUpdate;
    this.patientJson.cognome = this.surnameToUpdate;
    this.patientJson.sesso = this.genderToUpdate;
    this.patientJson.email = this.patient.email;
    this.patientJson.password = await HashingUtilities.HashPassword(this.patient.password);
    this.patientJson.indirizzo = [this.CAPToUpdate, this.streetToUpdate, this.civicNumberToUpdate, this.citta];
    this.patientJson.indirizzo.cap = this.CAPToUpdate;
    this.patientJson.indirizzo.via = this.streetToUpdate;
    this.patientJson.indirizzo.numeroCivico = this.civicNumberToUpdate;
    this.patientJson.indirizzo.città = this.cityToUpdate;
    // this.patientJson.medicoCurante = this.medicToUpdate;
    this.patientJson.esenzione = this.exemptionToUpdate;
    this.patientJson.donatoreOrgani = this.donorToUpdate;
    this.patientJson.cf = this.patient.CF;
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
}
