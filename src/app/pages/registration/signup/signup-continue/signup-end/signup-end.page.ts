import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader, IonImg, IonInput, IonItem, IonModal, IonSelect, IonSelectOption, IonText,
  IonTitle, IonToast,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {PazienteService} from "../../../../../services/PazienteService/paziente.service";
import {firstValueFrom} from "rxjs";
import {Paziente} from "../../../../../models/paziente/Paziente";
import {Sesso} from "../../../../../models/persona/sesso";

@Component({
  selector: 'app-signup-end',
  templateUrl: './signup-end.page.html',
  styleUrls: ['./signup-end.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonDatetime, IonImg, IonInput, IonItem, IonModal, IonSelect, IonSelectOption, IonText, IonToast]
})
export class SignupEndPage implements OnInit {
  private email:string;
  private password:string;
  private birthday:string;
  private CF: string;
  private nome:string;
  private cognome:string;
  private sesso: Sesso;
  protected citta:string
  protected cap:string
  protected indirizzo:string
  protected numeroCivico:string
  protected message:string
  protected isToastOpen: boolean;
  private paziente:any;
  private indirizzoJson:any

  constructor(private navCtrl:NavController,private pazienteService: PazienteService) {
    this.email = history.state.emailPaziente;
    this.password = history.state.hashedPassword
    this.birthday = history.state.birthday
    this.CF = history.state.CFValue
    this.nome = history.state.nome
    this.cognome = history.state.cognome
    this.sesso = history.state.sesso
    this.citta=""
    this.cap=""
    this.indirizzo=""
    this.numeroCivico=""
    this.message=""
    this.isToastOpen = false
    this.paziente = {}
    this.indirizzoJson = {}
  }

  ngOnInit() {
  }
  async confirmRegistration() {
    if (this.isAValidCAP()) {
      try {
        this.setPaziente()
        await firstValueFrom<Paziente>(
          this.pazienteService.addPaziente(this.paziente)
        )
        this.navCtrl.navigateRoot('signup-confirmed');
      } catch (err) {
        this.message = "Ci sono stati problemi con la registrazione, contattare l'amministratore di sistema"
        this.setOpen(true)
        console.log(err)
      }
    } else {
      this.message = "CAP non valido!"
      this.setOpen(true)
    }
  }

  isEnable():boolean{
    return this.indirizzo === "" || this.numeroCivico === "" ||this.citta === ""|| this.cap === ""
  }

  private isAValidCAP():boolean {
    return /^\d+$/.test(this.cap);
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  routeToLogin():void{
    this.navCtrl.navigateRoot('login');
  }
  private setPaziente(){
    this.paziente.nome = this.nome;
    this.paziente.cognome = this.cognome;
    this.paziente.email = this.email;
    this.paziente.password= this.password;
    this.paziente.esenzione = false
    this.paziente.donatoreOrgani = false
    this.paziente.cf = this.CF
    this.indirizzoJson.cap = this.cap;
    this.indirizzoJson.via=this.indirizzo;
    this.indirizzoJson.numeroCivico=this.numeroCivico;
    this.indirizzoJson.città=this.citta;
    this.paziente.indirizzo=this.indirizzoJson
  }
}
