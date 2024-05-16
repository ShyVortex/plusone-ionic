import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-patients-assistance',
  templateUrl: './patients-assistance.page.html',
  styleUrls: ['./patients-assistance.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PatientsAssistancePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
