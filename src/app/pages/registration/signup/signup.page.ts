import {Component, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonItem,
  IonInput,
  IonButton, IonText, IonToast, IonModal
} from '@ionic/angular/standalone';
import {firstValueFrom, Observable} from "rxjs";
import {Paziente} from "../../../models/paziente/Paziente";
import {PazienteService} from "../../../services/PazienteService/paziente.service";
import {LoginUtilities} from "../LoginUtilities";
import {Infermiere} from "../../../models/infermiere/Infermiere";
import {Persona} from "../../../models/persona/Persona";
import {HashingUtilities} from "../hashing-utilities";
import {exit} from "ionicons/icons";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonItem, IonInput, IonButton, IonText, IonToast]
})

export class SignupPage implements OnInit {
  protected password!: string;
  protected email!: string;
  protected message!:string
  protected password2!:string
  private hashedPassword!:string

  protected isPasswordVisible: boolean = false;
  protected isToastOpen: boolean;
  private personToInsert!: Paziente;

  constructor(private navCtrl: NavController,private pazienteService: PazienteService) {
    this.isToastOpen = false;
    this.email = ""
    this.password = ""
    this.password2 = ""

  }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  routeToLogin() {
    this.navCtrl.navigateBack('login');
  }

  async continueSignUp() {
    if (LoginUtilities.getRuoloByEmail(this.email) == "NON VALIDA") {
      this.message = "Email non valida, inserire un'email valida"
      this.setOpen(true)
    }
    if (LoginUtilities.getRuoloByEmail(this.email) == "PAZIENTE") {
        this.personToInsert = await firstValueFrom<Paziente>(this.pazienteService.getPazienteByEmail(this.email));
        console.log(this.personToInsert);

        if(this.personToInsert.password !== ""){
          this.message = "Utente già presente,vai nella schermata di login per accedere"
          this.setOpen(true)
        }
        else if(this.personToInsert.password === ""){
          if(this.matchPassword()) {
            this.hashedPassword = await HashingUtilities.HashPassword(this.password);
            this.navCtrl.navigateForward("signup-continue",{
              state:
                {
                  emailPaziente: this.email,
                  hashedPassword: this.hashedPassword,
                }
            })
          }
          else if(!this.matchPassword()){
            this.message = "Le password non corrispondono"
            this.setOpen(true)
          }
        }





      }
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  isEnable():boolean{
    return this.email === "" || this.password === "" ||this.password2 === ""
  }
  matchPassword():boolean{
    return this.password === this.password2
  }
}
