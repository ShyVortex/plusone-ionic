import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
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
import {Terapia} from "../../../models/Terapia/Terapia";

@Component({
  selector: 'app-logbook',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel, IonFooter, IonText, IonItem, IonRow, IonList, IonRefresher, IonRefresherContent]
})
export class NotificationsPage implements OnInit {
  protected medico!: Medico;
  private dataSubscription!:Subscription;
  private medicoEmail!:string;
  private getMedicoByEmailObservable!:Observable<Medico>
  private getAllprenotazioniByMedico!:Observable<Terapia[]>;
  protected prenotazioni!: Terapia[];


  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private dataService:DataService,
    private medicoService:MedicoService
  ) {
   /* this.medico = personaService.getPersona();

     Avere sempre il profilo di default a portata di mano aiuta nello sviluppo dato che altrimenti
       bisognerebbe sempre riloggare dopo il live reload di Ionic per vedere i cambiamenti effettuati
    if (!this.medico)
      this.medico = new Medico();

    */

  }

  ngOnInit() {
    this.dataSubscription = this.dataService.data$.subscribe((value:string) => {
        this.medicoEmail = value
        this.getMedicoByEmailObservable = this.medicoService.getMedicoByEmail(this.medicoEmail)
      }
    )
  }

  routeToSettings() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("settings");
  }

  goToHome() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateBack("medic-home", { animated: false });
  }

  goToNotifs() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPrescriptions() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("medic-prescriptions", { animated: false });
  }
  ionViewWillEnter(){
    this.getMedicoByEmailObservable.subscribe((value:Medico) =>{
      this.medico = value
      this.getAllprenotazioniByMedico = this.medicoService.getAllPrenotazioniByMedico(this.medico.id)
      this.getAllprenotazioniByMedico.subscribe((value:Terapia[]) =>{
        this.prenotazioni = this.formatPrenotazioni(value)
      })
    });
  }
  handleRefresh(event:any) {
    setTimeout(() => {
      this.getAllprenotazioniByMedico.subscribe((value:Terapia[]) =>{
        this.prenotazioni = this.formatPrenotazioni(value)
      })
      event.target.complete();
    }, 2000);
  }
   formatPrenotazioni(value: Terapia[]) :Terapia[]  {
    const carattere: string = "T";
    let prenotazioni:Terapia[] = []
     let prenotazione: Terapia = new Terapia();
    for (const terapia of value) {
      if(terapia.orario!=undefined  || terapia.orario!=null) {
        let posizione: number = terapia.orario.indexOf(carattere);
        let sottostringa: string = terapia.orario.substring(0, posizione);
        prenotazione = terapia;
        prenotazione.orario = sottostringa;
        prenotazioni.push(prenotazione);
      }
      else{
        prenotazioni.push(terapia)
      }
    }
    return prenotazioni
  }

}
