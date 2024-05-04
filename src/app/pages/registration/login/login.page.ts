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
  IonToolbar, IonToast, IonText
} from '@ionic/angular/standalone';
import {PazienteService} from "../../../services/PazienteService/paziente.service";
import {Person} from "../../../models/person/person";
import {Observable, Subscriber, Subscription,firstValueFrom} from "rxjs";
import {HashingUtilities} from "../hashing-utilities";
import {Paziente} from "../../../models/paziente/Paziente";
import {Infermiere} from "../../../models/infermiere/Infermiere";
import {Medico} from "../../../models/medico/Medico";
import {LoginUtilities} from "./LoginUtilities";
import {InfermiereService} from "../../../services/InfermiereService/infermiere.service";
import {MedicoService} from "../../../services/MedicoService/medico.service";
import {ModelUtilities} from "../../../models/ModelUtilities";
import {DataService} from "../../../services/data.service";

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
  private getPazienteByEmailObservable:Observable<Paziente>;
  private getInfermiereByEmailObservable:Observable<Infermiere>;
  private getMedicoByEmailObservable:Observable<Medico>;
  private addPazienteToMedicoObservable:Observable<Medico>;

  private hashedPassword:string;
  private personToLogin:any
  private medicoToAssign!:Medico


  constructor(private navCtrl: NavController, private pazienteService: PazienteService,private infermiereService: InfermiereService,private medicoService :MedicoService,private dataService:DataService) {
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


  async loginButton():Promise<void> {
    // Profili di default placeholder per far funzionare la login su Android Studio
    if (this.email === "default@paziente.it" && this.password === "default") {
      this.dataService.sendData(this.email);
      await this.navCtrl.navigateForward("patient-home", this.personToLogin);
    }
    if (this.email === "default@infermiere.it" && this.password === "default") {
      this.dataService.sendData(this.email);
      await this.navCtrl.navigateForward("nurse-home");
    }
    if (this.email === "default@medico.it" && this.password === "default") {
      this.dataService.sendData(this.email);
      await this.navCtrl.navigateForward("medic-home");
    }

      if (LoginUtilities.getRuoloByEmail(this.email) === "PAZIENTE") {
        this.getPazienteByEmailObservable = this.pazienteService.getPazienteByEmail(this.email)
        this.personToLogin = await firstValueFrom<Paziente>(this.getPazienteByEmailObservable)
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





  if(await HashingUtilities.verifyPassword(this.password, this.personToLogin.password)){

    this.dataService.sendData(this.email);

    if(LoginUtilities.getRuoloByEmail(this.email) === "PAZIENTE"){

      this.navCtrl.navigateForward("patient-home")

    }
    else if(LoginUtilities.getRuoloByEmail(this.email)=== "INFERMIERE"){
      this.navCtrl.navigateForward("nurse-home")

    }
    else if(LoginUtilities.getRuoloByEmail(this.email) === 'MEDICO'){
      this.navCtrl.navigateForward("medic-home")
    }


  }

      else if(!await HashingUtilities.verifyPassword(this.password, this.personToLogin.password)){
        this.setOpen(true);
        console.log("Credenziali non valide")
      }
  }


  isEnable():boolean{


    return this.email === "" || this.password === "";
  }

}
