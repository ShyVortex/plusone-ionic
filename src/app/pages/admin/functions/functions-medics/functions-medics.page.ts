import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonContent, IonFooter,
  IonHeader, IonImg, IonItem,
  IonLabel, IonList,
  IonProgressBar, IonSearchbar, IonTabBar, IonTabButton, IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {search} from "ionicons/icons";
import {Sesso} from "../../../../models/persona/sesso";
import {NavController} from "@ionic/angular";
import {Medico} from "../../../../models/medico/Medico";

@Component({
  selector: 'app-functions-medics',
  templateUrl: './functions-medics.page.html',
  styleUrls: ['./functions-medics.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonProgressBar, IonSearchbar, IonAvatar, IonImg, IonItem, IonList, IonFooter, IonTabBar, IonTabButton, IonTabs]
})
export class FunctionsMedicsPage implements OnInit {
  protected isLoading: boolean = true;
  protected medics!: Medico[];
  protected filteredMedics!: Medico[];

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-functions");
  }

  search(event: any) {
    if (event.target.value === "") {
      this.filteredMedics = this.medics;
      return;
    }

    this.filteredMedics = [];
    this.medics.forEach(element => {
      const fullName = `${element.nome} ${element.cognome}`.toLowerCase();
      const searchValue = event.target.value.toLowerCase();
      const reversedFullName = `${element.cognome} ${element.nome}`.toLowerCase();
      if (fullName.replace(/\s+/g, '')
          .includes(searchValue.replace(/\s+/g, '')) ||
        reversedFullName.replace(/\s+/g, '')
          .includes(searchValue.replace(/\s+/g, '')))
      {
        this.filteredMedics.push(element);
      }
    });
  }

  goToUserDetails(item: any) {

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

  protected readonly Sesso = Sesso;
}