import { Component, OnInit } from '@angular/core';
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
  IonToolbar
} from '@ionic/angular/standalone';
import {PersonService} from "../../../services/PersonService/person.service";
import {Person} from "../../../models/person/person";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonLabel, IonInput, IonItem, IonIcon, IonButton, IonList, IonCheckbox]
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController,private personService:PersonService) {

  }

  ngOnInit() {
     this.personService.getPeople().subscribe(value => console.log("Dati ricevuti: ${value}"))
  }

   routeToSignUp() {
    this.navCtrl.navigateForward('signup');
  }

}
