import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup-continue',
  templateUrl: './signup-continue.page.html',
  styleUrls: ['./signup-continue.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SignupContinuePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
