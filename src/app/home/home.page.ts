import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$:Observable<User[]> = this._users.asObservable();
  
  ngOnInit(): void {
    var users:User[] = [
      {nombre: "Juan",apellidos: "Fernández García",edad: 18},
      {nombre: "Lamine",apellidos: "Yamal",edad: 16},
      {nombre: "Amador",apellidos: "Rivas Latorre",edad: 46},
      {nombre: "Olga",apellidos: "Carmona García",edad: 23},
      {nombre: "Aitana",apellidos: "Ocaña Morales",edad: 24}
    ];
    this._users.next(users);
  }

  constructor() {}
  
}
