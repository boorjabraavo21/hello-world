import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fav } from './home/fav';
import { UserNotFoundException } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  private _fav_users:BehaviorSubject<Fav[]> = new BehaviorSubject<Fav[]>([]);
  public fav_users$:Observable<Fav[]> = this._fav_users.asObservable();

  constructor() { }

  public getAll():Observable<Fav[]> {
    return new Observable(observer=>{
      setTimeout(() => {
        var fav_us:Fav[] = [
          {id: 1},
          {id: 2},
          {id: 5}
        ];
        observer.next(fav_us);
        this._fav_users.next(fav_us);
        observer.complete();
      },1000);
    });
  }

  public addFav(idF:number):Observable<Fav> {
    return new Observable(observer=>{
      setTimeout(()=>{
        var favs = [...this._fav_users.value];
        var new_fav:Fav = {id: idF};
        favs.push(new_fav);
        observer.next(new_fav);
        this._fav_users.next(favs);
        observer.complete();
      },500);
    })
  }

  public deleteFav(idF:number):Observable<Fav> {
    return new Observable(observer=>{
      setTimeout(()=>{
        var favs = [...this._fav_users.value];
        var index = favs.findIndex(f => f.id == idF);
        if (index < 0) {
          observer.error(new UserNotFoundException());
        } else {
          favs = [...favs.slice(0,index),...favs.slice(index+1)];
          this._fav_users.next(favs);
          observer.next(favs[index]);
        }
        observer.complete();
      },500);
    });
  }

  public deleteAll():Observable<void> {
    return new Observable(observer=>{
      setTimeout(()=>{
        this._fav_users.next([]);
        observer.next();
        observer.complete();
      },1000);
    })
  }
}
