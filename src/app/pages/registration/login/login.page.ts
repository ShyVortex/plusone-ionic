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
  protected isToastOpen: boolean = false;
  private getAllPazientiSubscription: Subscription

  private getPazienteByEmailObservable:Observable<Paziente>;
  private getInfermiereByEmailObservable:Observable<Infermiere>;
  private getMedicoByEmailObservable:Observable<Medico>;
  private hashedPassword:string;
  private personToLogin:any

  constructor(private navCtrl: NavController, private pazienteService: PazienteService) {
    this.email = "";
    this.password = "";
    this.hashedPassword = "";


    this.getAllPazientiSubscription = new Subscription();
    this.getPazienteByEmailObservable = new Observable<Paziente>();
    this.getMedicoByEmailObservable = new Observable<Medico>();
    this.getInfermiereByEmailObservable = new Observable<Infermiere>();
  }

  ngOnInit() {
      console.log(HashingUtilities.HashPassword("pippo"))
      console.log(HashingUtilities.HashPassword("mimmo"))
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

    if(LoginUtilities.getRuoloByEmail(this.email) === "PAZIENTE"){
      this.getPazienteByEmailObservable =  this.pazienteService.getPazienteByEmail(this.email)
      this.personToLogin = await firstValueFrom<Paziente>(this.getPazienteByEmailObservable);
    }





  if(await HashingUtilities.verifyPassword(this.password, this.personToLogin.password)){
    try {
      console.log(await HashingUtilities.verifyPassword(this.password, this.personToLogin.password))
    } catch (error) {
      this.setOpen(true);
      console.log("Credenziali non valide")
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
