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
    IonRow, IonSelect, IonSelectOption, IonText
} from '@ionic/angular/standalone';
import {AlertController, NavController} from "@ionic/angular";
import { Sesso } from 'src/app/models/persona/sesso';
import { StorageService } from 'src/app/services/StorageService/storage.service';
import {Infermiere} from "../../../../../../models/infermiere/Infermiere";
import {SignupUtilities} from "../../../../../registration/signup/SignupUtilities";
import {InfermiereService} from "../../../../../../services/InfermiereService/infermiere.service";
import {firstValueFrom} from "rxjs";
import {HashingUtilities} from "../../../../../registration/hashing-utilities";

@Component({
  selector: 'app-nurse-modify-details',
  templateUrl: './nurse-modify-details.page.html',
  styleUrls: ['./nurse-modify-details.page.scss'],
  standalone: true,
    imports: [IonAlert, IonInput, IonItem, IonButton, IonLabel, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonSelect, IonSelectOption, IonText]
})

export class NurseModifyDetailsPage implements OnInit {
  protected nurse: Infermiere;
  protected isPasswordVisible: boolean = false;
  protected readonly Sesso = Sesso;

  protected confirmButtons = [{
    text: 'Annulla',
    role: 'annulla',
    handler: () => {

    }
  }, {
    text: 'Conferma',
    role: 'conferma',
    handler: async () => {
      await this.jsonFromNurse()
      await firstValueFrom(this.infermiereService.updateInfermiere(this.nurseJson, this.nurse.id))

      this.navCtrl.navigateForward("admin-functions-nurses", {animated: false});
    }
  }];

  protected deleteButtons = [{
    text: 'Annulla',
    role: 'annulla',
    handler: () => {

    }
  }, {
    text: 'Elimina',
    role: 'elimina',
    handler: async () => {
      await firstValueFrom(this.infermiereService.deleteInfermiere(this.nurse.id))

      this.navCtrl.navigateForward("admin-functions-nurses", {animated: false});
    }
  }];

  protected nameToUpdate: string;
  protected surnameToUpdate: string;
  protected genderToUpdate: string;
  protected CFtoUpdate: string;
  protected emailToUpdate: string;
  protected passwordToUpdate: string;
  protected hospitalToUpdate: string;
  protected wardToUpdate: string;
  protected roleToUpdate: string;
  private nurseJson: any;
  protected alertButton = ["OK"];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
    private infermiereService: InfermiereService
  ) {
    this.nurse = this.storageService.getInfermiere();
    this.nameToUpdate = this.nurse.nome;
    this.surnameToUpdate = this.nurse.cognome;
    this.genderToUpdate = this.nurse.sesso;
    this.CFtoUpdate = this.nurse.CF;
    this.emailToUpdate = this.nurse.email;
    this.passwordToUpdate = 'pippo';
    this.hospitalToUpdate = this.nurse.ospedale;
    this.wardToUpdate = this.nurse.reparto;
    this.roleToUpdate = this.nurse.ruolo;
    this.nurseJson = {}
  }

  ngOnInit() {
  }

  navigateBack() {
    this.storageService.setInfermiere(this.nurse);
    this.navCtrl.navigateBack("admin-nurse-details");
  }

  goToHome() {
    this.navCtrl.navigateForward("admin-home", {animated: false});
  }

  goToRequests() {
    this.navCtrl.navigateForward("admin-requests", {animated: false});
  }

  goToFunctions() {
    this.navCtrl.navigateForward("admin-functions", {animated: false});
  }

  goToReports() {
    this.navCtrl.navigateForward("admin-reports", {animated: false});
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async presentAlert() {
    if (SignupUtilities.getRuoloByEmail(this.emailToUpdate)==="INFERMIERE") {
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

  async jsonFromNurse() {
    this.nurseJson.id = this.nurse.id;
    this.nurseJson.nome = this.nameToUpdate;
    this.nurseJson.cognome = this.surnameToUpdate;
    this.nurseJson.email = this.emailToUpdate;
    this.nurseJson.password = await HashingUtilities.HashPassword(this.passwordToUpdate);
    this.nurseJson.ospedale = this.hospitalToUpdate;
    this.nurseJson.reparto = this.wardToUpdate;
    this.nurseJson.ruolo = this.roleToUpdate;
    this.nurseJson.cf = this.CFtoUpdate;
  }
}
