import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonItem,
  IonInput,
  IonButton, IonText, IonDatetime, IonDatetimeButton, IonModal, IonLabel, IonButtons, IonSelect, IonSelectOption
} from '@ionic/angular/standalone';
import {Sesso} from "../../../../models/person/sesso";

@Component({
  selector: 'app-signup-continue',
  templateUrl: './signup-continue.page.html',
  styleUrls: ['./signup-continue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonItem, IonInput, IonButton, IonText, IonDatetime, IonDatetimeButton, IonModal, IonLabel, IonButtons, IonSelect, IonSelectOption]
})
export class SignupContinuePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  private emailPaziente: string;
  private hashedPassword: string;
  protected birthday: string;
  protected CFValue: string;
  protected nome: string;
  protected cognome: string;
  protected sesso: string;


  constructor(private navCtrl: NavController) {
    this.emailPaziente = history.state.emailPaziente;
    this.hashedPassword = history.state.hashedPassword;
    this.birthday = ""
    this.CFValue =  ""
    this.nome = ""
    this.cognome = ""
    this.sesso = ""
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.birthday, 'confirm');
    console.log(this.birthday)
  }

  ngOnInit() {

  }

  routeToSignupEnd() {
    console.log(this.birthday)
    console.log(this.CFValue)
    console.log(this.nome)
    console.log(this.cognome)
    console.log(this.sesso)
    this.navCtrl.navigateForward('signup-end',{
      state:{
        emailPaziente: this.emailPaziente,
        hashedPassword: this.hashedPassword,
        nome:this.nome,
        cognome:this.cognome,
        sesso:this.sesso,
        birthday:this.birthday,
        CFValue:this.CFValue
      }
    });
  }

  routeToLogin() {
    this.navCtrl.navigateRoot('login');
  }

  storeDate(event: CustomEvent) {
    this.birthday = event.detail.value.split('T')[0];
  }

  handleChange($event: CustomEvent) {
    this.sesso = $event.detail.value
  }

  onInputChange($event: any) {
    this.CFValue = $event.target.value.toUpperCase();
  }

  isEnable():boolean{
    return this.nome === "" || this.cognome === "" ||this.sesso === ""|| this.birthday === ""||this.CFValue=== ""
  }
}
