import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader, IonIcon,
  IonImg, IonItem,
  IonLabel, IonRow, IonTabBar, IonTabButton, IonTabs, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {StorageService} from "../../../../services/StorageService/storage.service";
import {Triage} from "../../../../models/triage/Triage";
import {CodiciTriage} from "../../../../models/triage/codici-triage";

@Component({
  selector: 'app-sos-request',
  templateUrl: './sos-request.page.html',
  styleUrls: ['./sos-request.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonFooter, IonImg, IonTabBar, IonTabButton, IonTabs, IonIcon, IonItem, IonRow, IonText]
})

export class SosRequestPage implements OnInit {
  protected richiesta: Triage;

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) {
    this.richiesta = this.storageService.getTriage();
  }

  ngOnInit() {
    this.checkValidPosition();
    this.updateMap(this.richiesta.posizione.latitudine, this.richiesta.posizione.longitudine);
  }

  checkValidPosition() {
    if (!this.richiesta.posizione.latitudine && !this.richiesta.posizione.longitudine) {
      // In caso di errore setta posizione ad Isernia
      this.richiesta.posizione.latitudine = 41.5972;
      this.richiesta.posizione.longitudine = 14.2345;
      console.log(this.richiesta.posizione);
    }
  }

  updateMap(lat: number, lon: number) {
    const mapIframe = document.getElementById('osm-map') as HTMLIFrameElement;
    const mapLink = document.getElementById('osm-link') as HTMLAnchorElement;

    const bbox = `${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}`;
    const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
    const link = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;

    mapIframe.src = src;
    mapLink.href = link;
  }

  acceptRequest() {
    this.navCtrl.navigateForward("nurse-sos-request-accepted");
  }

  denyRequest() {
    this.navCtrl.navigateForward("nurse-sos-request-denied");
  }

  navigateBack() {
    this.navCtrl.navigateBack("nurse-sos");
  }

  goToHome() {
    this.navCtrl.navigateBack("nurse-home", { animated: false });
  }

  goToDrugs() {
    this.navCtrl.navigateForward("nurse-drugs", { animated: false });
  }

  goToShifts() {
    this.navCtrl.navigateForward("nurse-shifts", { animated: false });
  }

  goToSOS() {
    this.navCtrl.navigateForward("nurse-sos", { animated: false });
  }

  protected readonly CodiciTriage = CodiciTriage;
}
