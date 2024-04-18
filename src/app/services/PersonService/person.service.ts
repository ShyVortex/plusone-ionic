import { Injectable } from '@angular/core';
import axios , { AxiosResponse } from 'axios';
import { Observable, Observer} from "rxjs";
import {Person} from "../../models/person/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personURL= "http://localhost:8080/api/users";


  constructor() {}

  getPeople():Observable<Person[]> {
    return new Observable<Person[]>((observer:Observer<Person[]>)  => {
      axios.get<Person[]>(this.personURL +"/getAll").then
      ((response:AxiosResponse<Person[],Person[]>)  => {
        observer.next(response.data);
        observer.complete();
      })
        .catch(error => {console.log(error)}
        );
    });
  }
  getPersonByEmailAndPassword(email:string,password:string):Observable<Person> {
    return new Observable<Person>((observer:Observer<Person>)  => {
      axios.get<Person>(this.personURL +"/getUserByEmailAndPassword/" + email +"/" + password).then
      ((response:AxiosResponse<Person,Person>)  => {
        observer.next(response.data);
        observer.complete();
      })
        .catch(error => {console.log(error)}
        );
    });
  }




}
