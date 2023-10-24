import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom, tap } from 'rxjs';
import { User } from './home/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export class UserNotFoundException extends Error {
  
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  id:number = 0;
  private _users:BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  public users$:Observable<User[]> = this._users.asObservable();

  constructor(
    private http:HttpClient
  ) { }

  public addUser(user:User):Observable<User> {
    var _user:any = {
      nombre: user.nombre,
      apellidos: user.apellidos,
      edad: user.edad
    }
    
    return this.http.post<User>(environment.apiUrl+"/users",_user).pipe(tap(_=>{
      this.getAll().subscribe();
    }))
    /*return new Observable<User>(observer=>{
      var users = [...this._users.value];
      user.id = ++this.id;
      users.push(user);
      this._users.next(users);
      observer.next(user);
    })*/
  }

  public getAll():Observable<User[]> {
    return this.http.get<User[]>(environment.apiUrl+'/users').pipe(tap(
      (users:User[]) => {
      this._users.next(users);
    }))
    /*return new Observable(observer=> {
      setTimeout(() => {
        var users:User[] = [
          {id: 1,nombre: "Juan",apellidos: "Fernández García",edad: 18,fav: true},
          {id: 2,nombre: "Lamine",apellidos: "Yamal",edad: 16,fav: true},
          {id: 3,nombre: "Amador",apellidos: "Rivas Latorre",edad: 46,fav: false},
          {id: 4,nombre: "Olga",apellidos: "Carmona García",edad: 23, fav: false},
          {id: 5,nombre: "Aitana",apellidos: "Ocaña Morales",edad: 24,fav: true}
        ];
        this.id = 5;
        this._users.next(users);
        observer.next(users);
        observer.complete();
      }, 1000);
    });*/
  }

  public getUser(id:number):Observable<User> {
    return this.http.get<User>(environment.apiUrl+`/users/${id}`)
    /*return new Observable(observer=> {
      setTimeout(() => {
        var user = this._users.value.find(user=>user.id == id);
        if (user) {
          observer.next(user);
        } else {
          observer.error(new UserNotFoundException());
        }
        observer.complete();
      }, 1000);
    });*/
  }

  public updateUser(user:User):Observable<User> {
    return new Observable<User>(obs => {
      this.http.patch<User>(environment.apiUrl+`/users/${user.id}`,user).subscribe(_=>{
        this.getAll().subscribe(_=>{
          this.getUser(user.id).subscribe(_user=>{
            obs.next(_user);
          })
        })
      });
    })
    /*return new Observable(observer => {
      setTimeout(() => {
        var users = [...this._users.value];
        var index = users.findIndex(us => us.id == user.id);
        if (index < 0) {
          observer.error(new UserNotFoundException());
        } else {
          users[index] = user;
          observer.next(user);
          this._users.next(users);
        }
        observer.complete();
      }, 500);
    })*/
  }

  public deleteUser(user:User):Observable<User> {
    return new Observable<User>(obs => {
      this.http.delete<any>(environment.apiUrl+`/users/${user.id}`).subscribe(_=>{
        this.getAll().subscribe(_=>{
          obs.next(user);
        })
      });
    })
    /*return new Observable(observer => {
      setTimeout(() => {
        var users = [...this._users.value];
        var index = users.findIndex(us => us.id == user.id);
        if (index < 0) {
          observer.error(new UserNotFoundException());
        } else {
          users = [...users.slice(0,index),...users.slice(index+1)];
          this._users.next(users);
          observer.next(user);
        }
        observer.complete();
      },500);
    });*/
  }
  
  public deleteAll():Observable<void> {
    return new Observable(observer => {
      setTimeout(() => {
        this._users.next([]);
        observer.next();
        observer.complete();
      }, 1000);
    })
  }
}
