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
import {PersonService} from "../../../services/PersonService/person.service";
import {Person} from "../../../models/person/person";
import {Observable, Subscriber, Subscription,firstValueFrom} from "rxjs";
import {person} from "ionicons/icons";
import {HashingUtilities} from "../hashing-utilities";

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
  private personToLogin:Person
  private getAllPeopleSubscription: Subscription
  private getPersonaByEmailAndPasswordObservable: Observable<Person>;
  private getPersonaByEmailObservable:Observable<Person>;
  private hashedPassword:string

  constructor(private navCtrl: NavController, private personService: PersonService) {
    this.email = "";
    this.password = "";
    this.hashedPassword = "";
    this.personToLogin = new Person(0,"","","","","","") ;

    this.getAllPeopleSubscription = new Subscription();
    this.getPersonaByEmailAndPasswordObservable = new Observable<Person>();
    this.getPersonaByEmailObservable = new Observable<Person>();
  }

  ngOnInit() {
      console.log(HashingUtilities.HashPassword("pippo"))
      console.log(HashingUtilities.HashPassword("mimmo"))
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

  showData() {
    console.log("EMAIL:", this.email);
    console.log("PASSWORD:", this.password)
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  async loginButton():Promise<void> {


    this.getPersonaByEmailObservable =  this.personService.getPersonByEmail(this.email)
      const data :any = await firstValueFrom<Person>(this.getPersonaByEmailObservable);

      this.personToLogin = Person.fromJSON(data);
      console.log(this.personToLogin);


      try {
        console.log(await HashingUtilities.verifyPassword(this.password, this.personToLogin.password))
      }
        catch (error){
          this.setOpen(true);
          console.log("Credenziali non valide")
      }
       if(!this.personToLogin.isEmpty() && await HashingUtilities.verifyPassword(this.password, this.personToLogin.password) ) {


        if (this.personToLogin.getRuolo() === "ADMIN") {

        } else if (this.personToLogin.getRuolo() === "PAZIENTE") {
          this.navCtrl.navigateForward('patient-home')
        } else if (this.personToLogin.getRuolo() === "MEDICO") {
          this.navCtrl.navigateForward('medic-home')
        } else if (this.personToLogin.getRuolo() === "INFERMIERE") {
          this.navCtrl.navigateForward('')
        }


      }
      else if(!await HashingUtilities.verifyPassword(this.password, this.personToLogin.password)){
        this.setOpen(true);
        console.log("Credenziali non valide")
      }
  }
  isEnable():boolean{


    if(this.email===""||this.password===""){
      return true
    }
    else return false;
  }
}
