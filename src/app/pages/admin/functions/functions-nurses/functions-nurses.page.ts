import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton,
  IonContent, IonFooter,
  IonHeader,
  IonImg, IonItem,
  IonLabel, IonList, IonProgressBar, IonSearchbar, IonTabBar, IonTabButton, IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {Infermiere} from "../../../../models/infermiere/Infermiere";
import {Sesso} from "../../../../models/persona/sesso";
import { InfermiereService } from 'src/app/services/InfermiereService/infermiere.service';

@Component({
  selector: 'app-functions-nurses',
  templateUrl: './functions-nurses.page.html',
  styleUrls: ['./functions-nurses.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonLabel, IonAvatar, IonImg, IonItem, IonList, IonProgressBar, IonSearchbar, IonFooter, IonTabBar, IonTabButton, IonTabs]
})
export class FunctionsNursesPage implements OnInit {
  protected isLoading: boolean = true;
  protected nurses!: Infermiere[];
  protected filteredNurses!: Infermiere[];

  constructor(
    private navCtrl: NavController,
    private infermiereService: InfermiereService
  ) { }

  ngOnInit() {
    this.loadItems();
  }

  async loadItems() {
    setTimeout(() => {
      this.infermiereService.getAllInfermieri().subscribe((result: Infermiere[]) => {
        this.nurses = result;
        this.filteredNurses = this.nurses;
      });
      this.isLoading = false;
    }, 1000);
  }  

  search(event: any) {
    if (event.target.value === "") {
      this.filteredNurses = this.nurses;
      return;
    }

    this.filteredNurses = [];
    this.nurses.forEach(element => {
      const fullName = `${element.nome}`.toLowerCase();
      const searchValue = event.target.value.toLowerCase();
      
      if (fullName.replace(/\s+/g, '').includes(searchValue.replace(/\s+/g, ''))) {
        this.filteredNurses.push(element);
      }
    });
  }

  goToUserDetails(item: any) {

  }

  navigateBack() {
    this.navCtrl.navigateBack("admin-functions");
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

  protected readonly Sesso = Sesso;
}
