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
  IonToolbar
} from '@ionic/angular/standalone';
import {PersonService} from "../../../services/PersonService/person.service";
import {Person} from "../../../models/person/person";
import {Observable, Subscriber, Subscription,firstValueFrom} from "rxjs";
import {person} from "ionicons/icons";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonLabel, IonInput, IonItem, IonIcon, IonButton, IonList, IonCheckbox]
})
export class LoginPage implements OnInit,OnDestroy {
  protected email: string
  protected password: string
  private personToLogin:Person
  private getAllPeopleSubscription: Subscription
  private getPersonaByEmailAndPasswordObservable: Observable<Person>;

  constructor(private navCtrl: NavController, private personService: PersonService) {
    this.email = "";
    this.password = "";
    this.personToLogin = new Person(0,"","","","","","") ;


    this.getAllPeopleSubscription = new Subscription();
    this.getPersonaByEmailAndPasswordObservable = new Observable<Person>();
  }

  ngOnInit() {

  }

  routeToSignUp() {
    this.navCtrl.navigateForward('signup');
  }

  ionViewWillEnter() {
    this.getAllPeopleSubscription = this.personService.getPeople().subscribe((value: Person[]) => value.forEach((person: Person) => {
      console.log(person);
    }))
  }

  ngOnDestroy() {
    this.getAllPeopleSubscription.unsubscribe()
  }

  async loginButton():Promise<void> {
    this.getPersonaByEmailAndPasswordObservable =  this.personService.getPersonByEmailAndPassword(this.email, this.password)
      const data :any = await firstValueFrom<Person>(this.getPersonaByEmailAndPasswordObservable);

      this.personToLogin = Person.fromJSON(data)

      console.log(this.personToLogin);


    if(this.personToLogin.getRuolo() === "ADMIN" ){
      console.log("ADMIN")
    }
    else if(this.personToLogin.getRuolo() === "PAZIENTE" ){
      console.log("PAZIENTE")
    }
    else if(this.personToLogin.getRuolo() === "MEDICO" ){
      console.log("MEDICO")
    }
    else if(this.personToLogin.getRuolo() === "INFERMIERE" ){
      console.log("INFERMIERE")
    }



  }
}
