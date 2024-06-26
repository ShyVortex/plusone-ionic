import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonButton, IonCheckbox,
  IonContent,
  IonHeader, IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel, IonList,
  IonTitle,
  IonToolbar, IonToast, IonText, AlertController
} from '@ionic/angular/standalone';
import {PazienteService} from "../../../services/PazienteService/paziente.service";
import {Observable, Subscriber, Subscription,firstValueFrom} from "rxjs";
import {HashingUtilities} from "../hashing-utilities";
import {Paziente} from "../../../models/paziente/Paziente";
import {Infermiere} from "../../../models/infermiere/Infermiere";
import {Medico} from "../../../models/medico/Medico";
import {LoginUtilities} from "./LoginUtilities";
import {InfermiereService} from "../../../services/InfermiereService/infermiere.service";
import {MedicoService} from "../../../services/MedicoService/medico.service";
import {DataService} from "../../../services/data.service";
import {StorageService} from "../../../services/StorageService/storage.service";
import {PersonaService} from "../../../services/PersonaService/persona.service";
import {PersonaDefault} from "../../../models/persona/persona-default";
import {Admin} from "../../../models/admin/Admin";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonToast, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonLabel, IonInput, IonItem, IonIcon, IonButton, IonList, IonCheckbox, IonText]
})

export class LoginPage implements OnInit,OnDestroy {
  protected email: string
  protected password: string
  protected isPasswordVisible: boolean = false;
  protected isToastOpen: boolean = false;

  private getAllPazientiSubscription: Subscription
  private getPazienteByEmailObservable: Observable<Paziente>;
  private getInfermiereByEmailObservable: Observable<Infermiere>;
  private getMedicoByEmailObservable: Observable<Medico>;
  private addPazienteToMedicoObservable: Observable<Medico>;

  private hashedPassword: string;
  private personToLogin: any;
  private medicoToAssign!: Medico;

  public static canBypassToast: boolean = false;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private personaService: PersonaService,
    private pazienteService: PazienteService,
    private infermiereService: InfermiereService,
    private medicoService: MedicoService,
    private dataService:DataService,
    private storageService: StorageService
  ) {
    this.email = "";
    this.password = "";
    this.hashedPassword = "";

    this.getAllPazientiSubscription = new Subscription();
    this.getPazienteByEmailObservable = new Observable<Paziente>();
    this.getMedicoByEmailObservable = new Observable<Medico>();
    this.getInfermiereByEmailObservable = new Observable<Infermiere>();
    this.addPazienteToMedicoObservable = new Observable<Medico>()
  }

  ngOnInit() {
    console.log(HashingUtilities.HashPassword("pippo"))
    console.log(HashingUtilities.HashPassword("mimmo"))
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Errore',
      message: 'La tua registrazione non risulta ancora accettata.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  routeToSignUp() {
    this.navCtrl.navigateForward('signup');
  }

  ionViewWillEnter() {
    this.getAllPazientiSubscription = this.pazienteService.getAllPazienti().subscribe();

  }

  ngOnDestroy() {
    this.getAllPazientiSubscription.unsubscribe()
  }

  showData() {
    console.log("EMAIL:", this.email);
    console.log("PASSWORD:", this.password)
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


  async loginButton(): Promise<void> {
    // Profili di default per far funzionare la login sul file .apk
    if ((<any>Object).values(PersonaDefault).includes(this.email) && this.password === "password123") {
      LoginPage.canBypassToast = true;
      this.personToLogin = this.storageService.getState(this.email);

      if (this.personToLogin !== undefined)
        this.personaService.setPersona(this.personToLogin);

      if (LoginUtilities.getRuoloByEmail(this.email) === "PAZIENTE") {
        if (this.personToLogin === undefined)
          this.personaService.setPersona(new Paziente());

        this.dataService.sendData(this.email);
        this.personaService.setDefault(true);
        await this.navCtrl.navigateForward("patient-home");
      }

      else if (LoginUtilities.getRuoloByEmail(this.email) === "INFERMIERE") {
        if (this.personToLogin === undefined)
          this.personaService.setPersona(new Infermiere());

        this.dataService.sendData(this.email);
        this.personaService.setDefault(true);
        await this.navCtrl.navigateForward("nurse-home");
      }

      else if (LoginUtilities.getRuoloByEmail(this.email) === 'MEDICO') {
        if (this.personToLogin === undefined)
          this.personaService.setPersona(new Medico());

        this.dataService.sendData(this.email);
        this.personaService.setDefault(true);
        await this.navCtrl.navigateForward("medic-home");
      }

      else if (LoginUtilities.getRuoloByEmail(this.email) === 'ADMIN') {
        if (this.personToLogin === undefined)
          this.personaService.setPersona(new Admin());

        this.dataService.sendData(this.email);
        this.personaService.setDefault(true);
        await this.navCtrl.navigateForward("admin-home");
      }
    }

    if (LoginUtilities.getRuoloByEmail(this.email) === "PAZIENTE") {
      this.getPazienteByEmailObservable = this.pazienteService.getPazienteByEmail(this.email)
      try {
        this.personToLogin = await firstValueFrom<Paziente>(this.getPazienteByEmailObservable)
      }
      catch(error) {
        this.setOpen(true)
      }
      console.log(this.personToLogin)
    } else if (LoginUtilities.getRuoloByEmail(this.email) === "INFERMIERE") {
      this.getInfermiereByEmailObservable = this.infermiereService.getInfermiereByEmail(this.email)
      this.personToLogin = await firstValueFrom<Infermiere>(this.getInfermiereByEmailObservable);
    } else if (LoginUtilities.getRuoloByEmail(this.email) === 'MEDICO') {
      this.getMedicoByEmailObservable = this.medicoService.getMedicoByEmail(this.email);
      this.personToLogin = await firstValueFrom<Medico>(this.getMedicoByEmailObservable);
    } else if (LoginUtilities.getRuoloByEmail(this.email) === "NON VALIDA") {
      this.setOpen(true);
    }

    if (await HashingUtilities.verifyPassword(this.password, this.personToLogin.password)) {
      this.dataService.sendData(this.email);

      if (LoginUtilities.getRuoloByEmail(this.email) === "PAZIENTE") {
        if (this.personToLogin.attivo) {
          this.personaService.setDefault(false);
          this.navCtrl.navigateForward("patient-home");
        }
        else
          this.showAlert();
      }
      else if (LoginUtilities.getRuoloByEmail(this.email)=== "INFERMIERE") {
        this.personaService.setDefault(false);
        this.navCtrl.navigateForward("nurse-home");
      }
      else if (LoginUtilities.getRuoloByEmail(this.email) === 'MEDICO') {
        this.personaService.setDefault(false);
        this.navCtrl.navigateForward("medic-home");
      }
    }
    else {
      if (!LoginPage.canBypassToast) {
        this.setOpen(true);
        console.log("Credenziali non valide")
      }
    }
  }

  isEnable():boolean {
    return this.email === "" || this.password === "";
  }
}
