/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonTabs, IonTabBar, IonTabButton, IonImg, IonLabel, IonButton, IonItem, IonInput, IonAlert, IonRow, IonSelect, IonSelectOption, IonIcon, IonItemDivider, IonModal, IonList, IonText, IonAvatar, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { AlertController, NavController} from "@ionic/angular";
import { StorageService } from 'src/app/services/StorageService/storage.service';
import { firstValueFrom } from "rxjs";
import { PazienteService } from "../../../../../../services/PazienteService/paziente.service";
import { Paziente } from "../../../../../../models/paziente/Paziente";
import { Medico } from "../../../../../../models/medico/Medico";
import { LoginUtilities } from "../../../../../registration/LoginUtilities";
import { HashingUtilities } from "../../../../../registration/hashing-utilities";
import { MedicoService } from "../../../../../../services/MedicoService/medico.service";
import { Sesso } from 'src/app/models/persona/sesso';

@Component({
  selector: 'app-patient-modify-details',
  templateUrl: './patient-modify-details.page.html',
  styleUrls: ['./patient-modify-details.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardTitle, IonAvatar, IonText, IonList, IonModal, IonItemDivider, IonIcon, IonAlert, IonInput, IonItem, IonButton, IonLabel, IonImg, IonTabButton, IonTabBar, IonTabs, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonSelect, IonSelectOption]
})

export class PatientModifyDetailsPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  protected citta: string;
  protected nameToUpdate: string;
  protected surnameToUpdate: string;
  protected genderToUpdate: string;
  protected CFtoUpdate: string;
  protected emailToUpdate: string;
  protected passwordToUpdate: string;
  protected cityToUpdate: string;
  protected CAPtoUpdate: string;
  protected streetToUpdate: string;
  protected civicNumberToUpdate: string;
  protected exemptionToUpdate: string;
  protected donorToUpdate: string;
  // protected medicToUpdate: string;
  protected activeState: string;
  private patientJson: any;
  protected alertButton = ["OK"];

  protected firstLoading: boolean = false;
  protected isLoading: boolean = true;

  protected medics!: any[];
  protected filteredMedics!: any[];

  protected isMedicAssigned!: boolean;
  protected assignedMedic!: any;
  protected assignedMedicDetails!: string;

  protected patient: Paziente;
  protected isPasswordVisible: boolean = false;

  protected readonly Sesso = Sesso;

  protected confirmButtons = [{
    text:'Annulla',
    role:'annulla',
    handler:()=> {}
  }, {
    text:'Conferma',
    role:'conferma',
    handler:async () => {
      await this.jsonFromPatient()
      this.medicoService.addPazienteToMedico(this.assignedMedic.id, this.patient.id).subscribe(() => {});
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

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService,
    private alertController: AlertController,
    private pazienteService: PazienteService,
    private medicoService: MedicoService
  ) {
    this.patient = this.storageService.getPaziente();
    this.citta = this.patient.indirizzo.città;
    this.nameToUpdate = this.patient.nome;
    this.surnameToUpdate = this.patient.cognome;
    this.genderToUpdate = this.patient.sesso;
    this.CFtoUpdate = this.patient.CF;
    this.emailToUpdate = this.patient.email;
    this.passwordToUpdate = 'pippo';
    this.cityToUpdate = this.citta;
    this.CAPtoUpdate = this.patient.indirizzo.cap;
    this.streetToUpdate = this.patient.indirizzo.via;
    this.civicNumberToUpdate = this.patient.indirizzo.numeroCivico;
    this.exemptionToUpdate = this.patient.esenzione.toString();
    this.donorToUpdate = this.patient.donatoreOrgani.toString();
    // this.medicToUpdate = this.patient.medico.nome + " " + this.patient.medico.cognome;
    this.activeState = this.patient.attivo.toString();
    this.patientJson = {};

    this.medics = [];
    this.filteredMedics = [];

    this.pazienteService.getMedicoOfPaziente(this.patient.id.toString()).subscribe((result: any) => {
      this.assignedMedic = result;
      this.assignedMedicDetails = this.assignedMedic._nome + " " + this.assignedMedic._cognome;

      if (this.assignedMedic._nome == "") {
        this.isMedicAssigned = false;
        this.assignedMedicDetails = "Seleziona un medico";
      }
    });
  }

  ngOnInit() {}

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onModalOpen() {
    if(!this.firstLoading) {
      this.loadItems();
    }
  }

  async loadItems() {
    setTimeout(() => {
      this.medicoService.getAllMedici().subscribe((result: Medico[]) => {
        this.medics = result.filter((medic) => medic.tipologiaMedico === 'DI_BASE');
        this.filteredMedics = this.medics;
        console.log('Medici caricati');
      });
      this.isLoading = false;
      this.firstLoading = true;
    }, 1000);
  }

  async presentAlert() {
    if (LoginUtilities.getRuoloByEmail(this.emailToUpdate) === "PAZIENTE") {
      const alert = await this.alertController.create({
        header:"Conferma cambiamenti",
        message:"Sei sicuro di voler confermare le modifiche?",
        buttons:this.confirmButtons
      });
      await alert.present();
    }
    else {
      const alert = await this.alertController.create({
        header:"Errore",
        message:"Le password non corrispondono oppure l'email non è nel formato corretto.",
        buttons:this.alertButton
      });
      await alert.present();
    }
  }

  async jsonFromPatient() {
    this.patientJson.id = this.patient.id;
    this.patientJson.nome = this.nameToUpdate;
    this.patientJson.cognome = this.surnameToUpdate;
    this.patientJson.sesso = this.genderToUpdate;
    this.patientJson.email = this.emailToUpdate;
    this.patientJson.password = await HashingUtilities.HashPassword(this.passwordToUpdate);
    this.patientJson.indirizzo = {}; /* [this.CAPtoUpdate, this.streetToUpdate, this.civicNumberToUpdate, this.citta]; */
    this.patientJson.indirizzo.cap = this.CAPtoUpdate;
    this.patientJson.indirizzo.via = this.streetToUpdate;
    this.patientJson.indirizzo.numeroCivico = this.civicNumberToUpdate;
    this.patientJson.indirizzo.città = this.cityToUpdate;
    // this.patientJson.medicoCurante = this.medicToUpdate;
    this.patientJson.esenzione = this.exemptionToUpdate;
    this.patientJson.donatoreOrgani = this.donorToUpdate;
    this.patientJson.cf = this.CFtoUpdate;
  }

  storeMedic(medic: Medico) {
    this.assignedMedic = medic;
    this.isMedicAssigned = true;
    this.assignedMedicDetails = medic.nome + " " + medic.cognome;
    this.modal.dismiss();

    console.log("Medico assegnato: ", this.assignedMedic);
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
