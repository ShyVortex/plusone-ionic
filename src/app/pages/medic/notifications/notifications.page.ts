import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent, IonFooter,
  IonHeader, IonIcon,
  IonImg, IonItem, IonLabel, IonList, IonRefresher, IonRefresherContent, IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {Medico} from "../../../models/medico/Medico";
import {TipologiaMedico} from "../../../models/medico/tipologia-medico";
import {Observable, Subscription} from "rxjs";
import {DataService} from "../../../services/data.service";
import {MedicoService} from "../../../services/MedicoService/medico.service";
import {Terapia} from "../../../models/terapia/Terapia";
import {Sesso} from "../../../models/persona/sesso";
import {StorageService} from "../../../services/StorageService/storage.service";
import {Router} from "@angular/router";
import {Paziente} from "../../../models/paziente/Paziente";

@Component({
  selector: 'app-logbook',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, IonFooter, IonText, IonItem, IonRow, IonList, IonRefresher, IonRefresherContent, IonButton]
})

export class NotificationsPage implements OnInit {
  protected medico!: Medico;
  private dataSubscription!:Subscription;
  private medicoEmail!:string;
  private getMedicoByEmailObservable!:Observable<Medico>
  private getAllprenotazioniByMedico!:Observable<Terapia[]>;
  protected prenotazioni: Terapia[];


  constructor(
    private navCtrl: NavController,
    private router: Router,
    private personaService: PersonaService,
    private dataService:DataService,
    private medicoService:MedicoService,
    private storageService: StorageService
  ) {
     this.medico = personaService.getPersona();
     this.prenotazioni = [];

     /* Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati */
      if (!this.medico)
        this.medico = new Medico();
  }

  ngOnInit() {
    this.dataSubscription = this.dataService.data$.subscribe((value:string) => {
        this.medicoEmail = value
        this.getMedicoByEmailObservable = this.medicoService.getMedicoByEmail(this.medicoEmail)
      }
    )

    if (!this.medico.isManager && this.personaService.isDefault())
      this.medicoService.offlineSetMedico(this.medico);

    if (this.personaService.isDefault())
      this.prenotazioni = this.storageService.getTerapie();
  }

  ionViewWillEnter(){
    this.getMedicoByEmailObservable.subscribe((value:Medico) =>{
      this.medico = value
      this.getAllprenotazioniByMedico = this.medicoService.getAllPrenotazioniByMedico(this.medico.id)
      this.getAllprenotazioniByMedico.subscribe((value:Terapia[]) =>{
        this.prenotazioni = value;
      })
    });
  }

  checkRichieste(): boolean {
    if (this.prenotazioni.length > 0) {
      let valid: boolean = false;

      this.prenotazioni.forEach(prenotazione => {
        if (!prenotazione.attivo)
          valid = true;
      });

      return valid;
    }
    else
      return false;
  }

  routeToNotificationDetails(prenotazione: Terapia) {
    this.storageService.setTerapia(prenotazione);
    this.navCtrl.navigateForward("medic-notif-details");
  }

  routeToSettings() {
    this.personaService.setPersona(this.medico);
    this.storageService.setRoute(this.router.url);
    this.navCtrl.navigateForward("settings");
  }

  goToHome() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-home", { animated: false });
  }

  goToNotifs() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPatients() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-patients", { animated: false });
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      if (this.medico.isSet())
        this.getAllprenotazioniByMedico.subscribe((value:Terapia[]) =>{
          this.prenotazioni = value;
        })
      else
        this.prenotazioni = this.medico.pazienti[0].terapie;
      event.target.complete();
    }, 1000);
  }

  protected readonly Sesso = Sesso;
}
