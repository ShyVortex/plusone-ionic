import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonTabBar, IonTabButton, IonTabs,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {AnimationOptions, LottieComponent} from "ngx-lottie";
import {options} from "ionicons/icons";
import {NavController} from "@ionic/angular";
import {AnimationItem} from "lottie-web";
import {Paziente} from "../../../../../models/paziente/Paziente";
import {StorageService} from "../../../../../services/StorageService/storage.service";
import {Observable} from "rxjs";
import {PazienteService} from "../../../../../services/PazienteService/paziente.service";

@Component({
  selector: 'app-request-accepted',
  templateUrl: './request-accepted.page.html',
  styleUrls: ['./request-accepted.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonText, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, LottieComponent]
})
export class RequestAcceptedPage implements OnInit {
  protected paziente: Paziente;
  private activatePazienteObservable!: Observable<void>;

  options: AnimationOptions = {
    path: '../../../assets/animations/green-check.json',
    loop: false,
  };

  styles: Partial<CSSStyleDeclaration> = {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-3em',
    marginBottom: '-4em',
    height: '26em',
  }

  constructor(
    private navCtrl: NavController,
    private pazienteService: PazienteService,
    private storageService: StorageService
  ) {
    this.paziente = storageService.getPaziente();
  }

  ngOnInit() {
    this.activatePazienteObservable = this.pazienteService.activatePaziente(this.paziente.id);
    this.activatePazienteObservable.subscribe();
  }

  animationCreated(animationItem: AnimationItem): void {
    //console.log("Animazione renderizzata. \n\n", animationItem);
  }

  goToRequestsAnimated() {
    this.navCtrl.navigateBack("admin-requests", { animated: true });
  }

  goToHome() {
    this.navCtrl.navigateForward("admin-home", { animated: false });
  }

  goToRequests() {
    this.navCtrl.navigateForward("admin-requests", { animated: false });
  }

  goToFunctions() {
    this.navCtrl.navigateForward("admin-functions", { animated: false });
  }

  goToReports() {
    this.navCtrl.navigateForward("admin-reports", { animated: false });
  }
}
