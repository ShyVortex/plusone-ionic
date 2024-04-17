import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonTabBar,
  IonTabButton, IonTabs,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.page.html',
  styleUrls: ['./bugreport.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs]
})
export class BugreportPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
