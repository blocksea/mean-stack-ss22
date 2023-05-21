import { Component, OnInit } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './models/person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'phoneNumber',
    'emailAddress',
    'actions',
  ];
  title = 'Our Demo - Cassandra Spark';
  people: Person[] | null = null;
  editingPerson: Person | null = null;

  constructor(private peopleService: PeopleService) {}

  ngOnInit() {
    this.updatePeople();
  }

  updatePeople() {
    this.peopleService.listPeople().subscribe((people: Person[]) => {
      this.people = people;
    });
  }

  addPerson() {
    const newPerson: Person = {
      _id: undefined,
      name: '',
      phoneNumber: '',
      emailAddress: '',
    };

    this.peopleService.createPerson(newPerson).subscribe((data: any) => {
      this.updatePeople();
      this.editingPerson = {
        ...newPerson,
        _id: data._id,
      };
    });
  }

  editPerson(person: Person) {
    this.editingPerson = person;
  }

  doneEditing() {
    if (!this.editingPerson) return;

    this.updatePerson(this.editingPerson);

    this.editingPerson = null;
  }

  updatePerson(person: Person) {
    this.peopleService
      .updatePerson(person._id!, { ...person, _id: undefined })
      .subscribe(() => {
        this.updatePeople();
      });
  }

  deletePerson(person: Person) {
    // ----------------------------------------------------
    // TASK 3.3 START
    this.peopleService.deletePerson(person._id!).subscribe(() => {
      this.updatePeople();
    });

    // TASK 3.3 END
    // ----------------------------------------------------
  }

  nameChanged(target: EventTarget | null) {
    if (!target || !this.editingPerson) return;
    this.editingPerson = {
      ...this.editingPerson,
      name: (<HTMLInputElement>target).value,
    };
  }

  phoneNumberChanged(target: EventTarget | null) {
    if (!target || !this.editingPerson) return;
    this.editingPerson = {
      ...this.editingPerson,
      phoneNumber: (<HTMLInputElement>target).value,
    };
  }

  emailAddressChanged(target: EventTarget | null) {
    if (!target || !this.editingPerson) return;
    this.editingPerson = {
      ...this.editingPerson,
      emailAddress: (<HTMLInputElement>target).value,
    };
  }
}
