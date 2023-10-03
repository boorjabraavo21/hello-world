import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './home/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  public users:UserService | undefined;
  private _fav_users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public fav_users$:Observable<User[]> = this._fav_users.asObservable();

  constructor() { }

  public getAll():Observable<User[]> {
    return new Observable(observer=>{
      this.users?.getAll().subscribe(users => {
        users.find(user => user.fav??false);
      });
    });
  }

}
