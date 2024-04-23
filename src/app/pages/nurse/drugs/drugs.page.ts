import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonContent,
    IonHeader,
    IonIcon,
    IonImg, IonLabel,
    IonTabBar,
    IonTabButton, IonTabs,
    IonTitle,
    IonToolbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.page.html',
  styleUrls: ['./drugs.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonTabBar, IonTabButton, IonTabs, IonLabel]
})
export class DrugsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
