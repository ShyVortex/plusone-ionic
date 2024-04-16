import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import {Person} from "../../models/person/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personObservable: Observable<Person>;

  constructor(
    personObservable: Observable<Person>,
  ) {
    this.personObservable = personObservable;
  }

}
