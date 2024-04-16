import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import {Person} from "../../models/person/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personURL= "http://localhost:8080/api/users";


  constructor(
    private http: HttpClient
  ) {

  }
  getPeople():Observable<Person[]> {
    return this.http.get<Person[]>(`${this.personURL}/getAll`)
  }




}
