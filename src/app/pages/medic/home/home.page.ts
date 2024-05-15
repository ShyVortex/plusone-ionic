import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonNav,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { NavController } from "@ionic/angular";
import { Medico } from "../../../models/medico/Medico";
import { PersonaService } from "../../../services/PersonaService/persona.service";
import { MedicoService } from 'src/app/services/MedicoService/medico.service';
import { TipologiaMedico } from "../../../models/medico/tipologia-medico";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
    imports: [IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        IonTabs,
        IonNav,
        IonTabBar,
        IonTabButton,
        IonIcon, IonImg, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonCard, IonCardHeader, IonCardTitle, IonFooter, IonItem],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomePage implements OnInit {
  medico!: Medico;

  constructor(
    private navCtrl: NavController,
    private personaService: PersonaService,
    private medicoService: MedicoService
  ) {
    // this.medico = new Medico();
  }

  ngOnInit() {
    this.medicoService.getMedicoByEmail("mario.rascato@example.com").subscribe((result: Medico) => {
      this.medico = result;
      this.medico.setState(true);
      // console.log("ER MEDICO:", this.medico);
      // console.log(this.medico);
    });

    /* if (this.medico.isEmpty()) {
      this.medico.setState(false);
    }

    if (!this.medico.isSet()) {
      this.medico._nome = "Mario";
      this.medico._cognome = "Giannini";
      this.medico._email = "default@medico.it";
      this.medico._password = "default";
      this.medico._CF = "GNNMRA02R05E335P";
      this.medico._ospedale = "Ospedale Ferdinando Veneziale, Isernia (IS)";
      this.medico._reparto = "Cardiologia";
      this.medico._ruolo = "Primario";
      this.medico._tipologiaMedico = TipologiaMedico.OSPEDALIERO;
    } */
  }

  routeToSettings() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("settings");
  }

  routeToSecurity() {
    this.personaService.setPersona(this.medico);
    this.navCtrl.navigateForward("settings-security");
  }

  logout() {
    this.navCtrl.navigateRoot("login");
  }

  goToHome() {
    this.navCtrl.navigateBack("medic-home", { animated: false });
  }

  goToNotifs() {
    this.navCtrl.navigateForward("medic-notifs", { animated: false });
  }

  goToPrescriptions() {
    this.navCtrl.navigateForward("medic-prescriptions", { animated: false });
  }
}
