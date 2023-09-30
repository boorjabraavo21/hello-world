import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserInfoFavClicked } from './userinfofavclicked';
import { ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';

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
      {id: 1,nombre: "Juan",apellidos: "Fernández García",edad: 18,fav: true},
      {id: 2,nombre: "Lamine",apellidos: "Yamal",edad: 16,fav: true},
      {id: 3,nombre: "Amador",apellidos: "Rivas Latorre",edad: 46,fav: false},
      {id: 4,nombre: "Olga",apellidos: "Carmona García",edad: 23, fav: false},
      {id: 5,nombre: "Aitana",apellidos: "Ocaña Morales",edad: 24,fav: true}
    ];
    this._users.next(users);
  }

  onFavClicked(user:User, event:UserInfoFavClicked) {
    const usersC = [...this._users.value];
    var index = usersC.findIndex((_user)=>_user.id == user.id)

    if (index != -1)
      usersC[index].fav = event.fav??false;
    this._users.next([...usersC]);
    const options:ToastOptions = {
      message:`User ${event.fav?'added':'removed'} ${event.fav?'to':'from'} favourites`,
      duration: 1000,
      position: 'bottom',
      color: 'danger',
      cssClass: 'fav-ion-toast'
    };
    this.toast.create(options).then(toast=>toast.present());
  }

  constructor(
    private router:Router,
    private toast:ToastController
  ) {}
  
}
