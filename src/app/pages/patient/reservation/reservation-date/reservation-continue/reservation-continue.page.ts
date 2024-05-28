/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {
  AlertController,
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  NavController
} from '@ionic/angular/standalone';
import {time} from './times';
import {DataService} from "../../../../../services/data.service";
import {firstValueFrom, Observable, Subscription} from "rxjs";
import {Paziente} from "../../../../../models/paziente/Paziente";
import {Terapia} from "../../../../../models/terapia/Terapia";
import {PazienteService} from "../../../../../services/PazienteService/paziente.service";
import {TerapiaService} from "../../../../../services/TerapiaService/terapia.service";
import {TipologiaTerapia} from "../../../../../models/terapia/tipologia-terapia";
import {PersonaService} from "../../../../../services/PersonaService/persona.service";
import {StorageService} from "../../../../../services/StorageService/storage.service";

@Component({
  selector: 'app-reservation-continue',
  templateUrl: './reservation-continue.page.html',
  styleUrls: ['./reservation-continue.page.scss'],
  standalone: true,
  imports: [IonAlert, IonFooter, IonImg, IonTabButton, IonTabBar, IonTabs, IonItemDivider, IonItem, IonButton, IonCard, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSegment, IonIcon, IonSegmentButton, IonLabel]
})
export class ReservationContinuePage implements OnInit {
  times!: time[];
  actualIndex!: number;

  type!: string;
  hospitalWard!: string;
  date!: string;
  private dataSubscription!:Subscription;
  private patientToPrenote!:Paziente;
  private terapia:any;
  private terapiaAdded:Terapia;
  private getPazienteByEmailObservable:Observable<Paziente>;

  public alertButtons = [
    {
      text: 'Annulla',
      role: 'cancel',
      handler: () => {}
    },
    {
      text  : 'Conferma',
      role: 'confirm',
      handler: async () => {
        this.setTerapia()

        if (this.patientToPrenote !== undefined && this.patientToPrenote.isSet()) {
          console.clear();
          console.log("patientToPrenote:", this.patientToPrenote);
          await firstValueFrom<Terapia>(
            this.terapiaService.addTerapia(1, this.patientToPrenote.id, this.terapia)
          );
        }

        else {
          this.terapiaService.addTerapiaOffline(
            this.patientToPrenote, this.patientToPrenote.medico, this.terapia
          );

          this.personaService.setPersona(this.patientToPrenote);
          this.storageService.cacheTerapie(this.patientToPrenote.terapie);
        }

        this.routeToReservationConfirmed();
      }
    }
  ];

  constructor(
    private navCtrl: NavController,
    private route: Router,
    private alertController: AlertController,
    private dataService:DataService,
    private personaService: PersonaService,
    private pazienteService:PazienteService,
    private terapiaService:TerapiaService,
    private storageService: StorageService
  ) {
    this.getPazienteByEmailObservable = new Observable<Paziente>();
    this.terapiaAdded = new Terapia();
    this.terapia = {};
    // actualIndex inital value is a placeholder
    this.actualIndex = 6;
    this.times = [
      { time: '07:00', clicked: false },
      { time: '11:00', clicked: false },
      { time: '15:30', clicked: false },
      { time: '16:15', clicked: false },
      { time: '18:00', clicked: false },
      { time: '18:30', clicked: false },
    ];
    console.log(this.type = history.state.type);
    console.log(this.hospitalWard = history.state.hospitalWard);
    console.log(this.date = history.state.date);
  }

  ngOnInit(): void {
    this.dataSubscription = this.dataService.data$.subscribe((value:string) => {
        this.getPazienteByEmailObservable = this.pazienteService.getPazienteByEmail(value)
      }
    )
  }

  ionViewWillEnter() {
    this.getPazienteByEmailObservable.subscribe((value:Paziente) =>{
      this.patientToPrenote = value
      if (!this.patientToPrenote) {
        this.patientToPrenote = this.personaService.getPersona();
      }
    });
  }

  async missingTimeAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'Fornire un orario per la prenotazione',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Conferma prenotazione',
      subHeader: 'Visita ' + this.type + ', ' + this.hospitalWard,
      message: this.date + ', alle ore ' + this.times[this.actualIndex].time,
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  private setTerapia(): void {
    this.terapia.tipologiaTerapia = this.type;
    this.terapia.orario = (this.date + "T" + this.times[this.actualIndex].time);
    this.terapia.reparto = this.hospitalWard;
    this.terapia.attivo = true;
    if (!this.patientToPrenote.isSet()) {
      this.patientToPrenote = this.personaService.getPersona();
      this.terapia.paziente = this.patientToPrenote;
    }
    console.log(this.terapia)
  }

  toggleClickedItem(clickedIndex: number) {
    if (this.actualIndex < 6) this.times[this.actualIndex].clicked = !this.times[this.actualIndex].clicked;
    /* if (this.actualIndex !== clickedIndex) */ this.actualIndex = clickedIndex;

    this.times[clickedIndex].clicked = !this.times[clickedIndex].clicked;
    //console.log(this.actualIndex, clickedIndex);
  }

  submit() {
    if (this.actualIndex === 6) {
      this.missingTimeAlert();
    } else {
      this.confirmAlert();
    }
  }

  routeToReservationConfirmed() {
    this.navCtrl.navigateForward('patient-reservation-confirmed', { state: {
      type: this.type,
      hospitalWard: this.hospitalWard,
      date: this.date,
      time: this.times[this.actualIndex].time,
    }});
  }

  routeToReservationDenied() {
    this.navCtrl.navigateForward('patient-reservation-denied');
  }

  navigateBack() {
    this.navCtrl.navigateBack('patient-reservation');
  }

  goToHome() {
    this.navCtrl.navigateBack("patient-home", { animated: false });
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
