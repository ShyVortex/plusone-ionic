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

@Component({
  selector: 'app-signup-continue',
  templateUrl: './signup-continue.page.html',
  styleUrls: ['./signup-continue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonItem, IonInput, IonButton, IonText, IonDatetime, IonDatetimeButton, IonModal, IonLabel, IonButtons, IonSelect, IonSelectOption]
})
export class SignupContinuePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  private emailPaziente:string;
  private hashedPassword:string;
  protected birthday!:string;
  CFValue: string;

  constructor(private navCtrl: NavController) {
    this.emailPaziente = history.state.emailPaziente;
    this.hashedPassword = history.state.hashedPassword;
    this.CFValue =  ""
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



  routeToLogin() {
    this.navCtrl.navigateRoot('login');
  }



  storeDate(event: CustomEvent) {
    this.birthday = event.detail.value.split('T')[0];
  }


  handleChange($event: CustomEvent) {
    console.log($event.detail.value)
  }

  onInputChange($event: any) {
    this.CFValue = $event.target.value.toUpperCase();
  }
}
