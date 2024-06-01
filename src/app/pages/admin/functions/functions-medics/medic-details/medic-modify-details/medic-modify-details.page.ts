/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg, IonFooter, IonTabs, IonTabBar, IonTabButton, IonButton, IonLabel, IonAvatar, IonCardHeader, IonCard, IonCardTitle, IonCardSubtitle, IonInput, IonItem, IonAlert } from '@ionic/angular/standalone';
import {AlertController, NavController} from "@ionic/angular";
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { Sesso } from 'src/app/models/persona/sesso';
import {LoginUtilities} from "../../../../../registration/LoginUtilities";
import {alert} from "ionicons/icons";
import {MedicoService} from "../../../../../../services/MedicoService/medico.service";
import {firstValueFrom} from "rxjs";
import {Medico} from "../../../../../../models/medico/Medico";
import {HashingUtilities} from "../../../../../registration/hashing-utilities";

@Component({
  selector: 'app-medic-modify-details',
  templateUrl: './medic-modify-details.page.html',
  styleUrls: ['./medic-modify-details.page.scss'],
  standalone: true,
  imports: [IonAlert, IonItem, IonInput, IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, IonAvatar, IonLabel, IonButton, IonTabButton, IonTabBar, IonTabs, IonFooter, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MedicModifyDetailsPage implements OnInit {
  protected medic: Medico;
  protected readonly Sesso = Sesso;
  protected emailToUpdate!:string;
  protected passwordToUpdate:string;
  protected passwordToMatch:string;
  protected medicoJson:any;
  protected confirmButtons = [{
    text:'Annulla',
    role:'annulla',
    handler:()=> {

    }
  }, {
    text:'Conferma',
    role:'conferma',
    handler:async () => {
      await this.medicoToJson()
      await firstValueFrom(this.medicoService.updateMedico(this.medicoJson,this.medic.id))

       this.navCtrl.navigateForward("admin-functions-medics", {animated: false});
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
      await firstValueFrom(this.medicoService.deleteMedico(this.medic.id))

      this.navCtrl.navigateForward("admin-functions-medics", {animated: false});
    }
  }];
  protected alertButton =["OK"];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
    private medicoService: MedicoService
  ) {
    this.medic = this.storageService.getMedico();
    this.emailToUpdate = this.medic.email
    this.passwordToUpdate = ''
    this.passwordToMatch = ''
    this.medicoJson = {}
  }

  ngOnInit() {
  }

  navigateBack() {
    this.storageService.setMedico(this.medic);
    this.navCtrl.navigateBack("admin-medic-details");
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
  isMatching():boolean{
    return (this.passwordToUpdate===this.passwordToMatch) && (this.passwordToMatch!='') &&(this.passwordToUpdate!='');
  }
  async presentAlert() {

    if(this.isMatching() && (LoginUtilities.getRuoloByEmail(this.emailToUpdate)==="MEDICO")) {
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
  async medicoToJson(){
    this.medicoJson.email = this.emailToUpdate;
    this.medicoJson.password = await HashingUtilities.HashPassword(this.passwordToUpdate)
    this.medicoJson.id = this.medic.id;
    this.medicoJson.nome = this.medic.nome
    this.medicoJson.cognome = this.medic.cognome
    this.medicoJson.ospedale = this.medic.ospedale
    this.medicoJson.reparto = this.medic.reparto
    this.medicoJson.ruolo = this.medic.ruolo
    this.medicoJson.tipologiaMedico = this.medic.tipologiaMedico
    this.medicoJson.cf = this.medic.CF
  }
}
