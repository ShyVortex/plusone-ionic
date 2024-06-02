/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonFooter,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonButton,
  IonLabel,
  IonAvatar,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonInput,
  IonItem,
  IonAlert,
  IonRow, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
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
  imports: [IonAlert, IonItem, IonInput, IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, IonAvatar, IonLabel, IonButton, IonTabButton, IonTabBar, IonTabs, IonFooter, IonImg, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonSelect, IonSelectOption]
})

export class MedicModifyDetailsPage implements OnInit {
  protected medic: Medico;
  protected readonly Sesso = Sesso;
  protected nameToUpdate: string;
  protected surnameToUpdate: string;
  protected genderToUpdate: string;
  protected hospitalToUpdate: string;
  protected wardToUpdate: string;
  protected roleToUpdate: string;
  protected typologyToUpdate: string;
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
    this.nameToUpdate = this.medic.nome;
    this.surnameToUpdate = this.medic.cognome;
    this.genderToUpdate = this.medic.sesso;
    this.hospitalToUpdate = this.medic.ospedale;
    this.wardToUpdate = this.medic.reparto;
    this.roleToUpdate = this.medic.ruolo;
    this.typologyToUpdate = this.medic.tipologiaMedico;
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header:"Conferma cambiamenti",
      message:"Sei sicuro di voler confermare le modifiche?",
      buttons:this.confirmButtons
    });
    await alert.present();
  }

  async medicoToJson(){
    this.medicoJson.email = this.medic.email;
    this.medicoJson.password = await HashingUtilities.HashPassword(this.medic.password);
    this.medicoJson.id = this.medic.id;
    this.medicoJson.nome = this.nameToUpdate;
    this.medicoJson.cognome = this.surnameToUpdate;
    this.medicoJson.ospedale = this.hospitalToUpdate;
    this.medicoJson.reparto = this.wardToUpdate;
    this.medicoJson.ruolo = this.roleToUpdate;
    this.medicoJson.tipologiaMedico = this.typologyToUpdate;
    this.medicoJson.cf = this.medic.CF;
  }
}
