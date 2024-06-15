import { Component, ModelSignal, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { AlertController, IonContent, IonHeader, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, NavController, IonSegment, IonSegmentButton, IonDatetime, IonLabel, IonButton,  IonFooter,  IonRow, IonSelect, IonSelectOption, IonAlert, IonItem, IonText, IonAvatar, IonList, IonButtons, IonModal, IonCard, IonCardTitle, IonCardSubtitle, IonProgressBar, IonItemDivider } from '@ionic/angular/standalone';
import { Medico } from 'src/app/models/medico/Medico';
import { MedicoService } from 'src/app/services/MedicoService/medico.service';
import { Sesso } from 'src/app/models/persona/sesso';
import {StorageService} from "../../../../services/StorageService/storage.service";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation-date.page.html',
  styleUrls: ['./reservation-date.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonProgressBar, IonCardSubtitle, IonCardTitle, IonCard, IonModal, IonButtons, IonList, IonAvatar, IonText, IonItem, IonAlert, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar,IonTabButton,IonTabs,IonIcon,IonSegment,IonSegmentButton, IonDatetime, IonLabel, IonButton,IonRow,IonSelect,IonSelectOption,]
})
export class ReservationDatePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  protected readonly Sesso = Sesso;
  protected currentDateTime!: string;

  protected firstLoading: boolean = false;
  protected isLoading: boolean = true;

  protected type!: string;

  protected medics!: any[];
  protected filteredMedics!: any[];

  protected hospitalWard!: string;
  protected chosenMedic!: Medico;
  protected date!: string;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private medicoService: MedicoService,
    private storageService:StorageService
  ) {
    this.currentDateTime = new Date().toISOString();
    this.hospitalWard = "Specifica reparto";
    this.medics = [];
    this.filteredMedics = [];
  }

  ngOnInit() {
    this.type = history.state.type;
  }

  onModalOpen() {
    if(!this.firstLoading) {
      this.loadItems();
    }
  }

  async loadItems() {
    setTimeout(() => {
      this.medicoService.getAllMedici().subscribe((result: Medico[]) => {
        this.medics = result.filter((medic) => medic.tipologiaMedico === 'OSPEDALIERO');
        this.filteredMedics = this.medics;
        console.log('Medici caricati');
      });
      this.isLoading = false;
      this.firstLoading = true;
    }, 1000);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Compilare tutti i campi.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentWardAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Selezione un reparto.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  updateList() {
    this.filteredMedics = this.medics.filter(medic => medic.reparto === this.hospitalWard);
    console.log("Medici filtrati", this.filteredMedics);
  }

  storeHospitalWard(event: CustomEvent) {
    this.hospitalWard = event.detail.value;
  }

  storeMedic(medic: Medico) {
    this.chosenMedic = medic;
    this.storageService.setMedico(this.chosenMedic);

    console.log("Medico scelto: ", this.chosenMedic);

    if (!this.hospitalWard) {
      this.presentWardAlert();
    } else {
      this.modal.dismiss();
      this.storageService.setMedico(this.chosenMedic)

      console.log(this.chosenMedic);
    }
  }

  storeDate(event: CustomEvent) {
    this.date = event.detail.value.split('T')[0];
  }

  submit() {
    switch (this.type) {
      case 'SPECIALISTICA':
        if (!this.hospitalWard || !this.date || !this.chosenMedic) {
          this.presentAlert();
        } else {
          this.routeToReservationContinue();
        }
      break;

      case 'GENERALE':
        if (!this.hospitalWard || !this.date) {
          this.presentAlert();
        } else {
          this.routeToReservationContinue();
        }
      break;
    }
  }

  navigateBack() {
    this.navCtrl.navigateBack("patient-reservation");
  }

  routeToReservationContinue() {
    this.navCtrl.navigateForward("patient-reservation-continue", {
      state: {
        type: this.type,
        hospitalWard: this.hospitalWard,
        date: this.date,
        // chosenMedic: this.chosenMedic
      }
    });
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
}
