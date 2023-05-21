import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from './models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }

  listPeople() {
    return this.http.get<Person[]>(`/people`);
  }

  getPerson(id: string) {
    return this.http.get<Person>(`/people/${id}`);
  }

  createPerson(person: Person) {
    return this.http.post(`/people`, person);
  }

  updatePerson(id: string, person: Person) {
    return this.http.put(`/people/${id}`, person);
  }


  // ----------------------------------------------------
  // TASK 3.2 START
  deletePerson(id: string) {
    return this.http.delete(`/people/${id}`)
  }
  // TASK 3.2 END
  // ----------------------------------------------------

}
