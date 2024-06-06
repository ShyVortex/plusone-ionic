import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-logbook-prescription-details',
  templateUrl: './logbook-prescription-details.page.html',
  styleUrls: ['./logbook-prescription-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LogbookPrescriptionDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
