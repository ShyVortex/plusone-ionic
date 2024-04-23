import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader, IonIcon,
  IonImg, IonLabel, IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs, IonText, IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonImg, IonTabBar, IonTabButton, IonTabs, IonButton, IonLabel, IonRow, IonText, IonTextarea, IonIcon]
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
