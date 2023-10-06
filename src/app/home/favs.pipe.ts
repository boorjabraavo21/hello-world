import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user';
import { Fav } from './fav';

@Pipe({
  name: 'favs'
})
export class FavsPipe implements PipeTransform {

  transform(users: User[] | null, favs: Fav[] | null): User[] {
    var us = [...users??[]];
    us = us.map (
      u => {
        return {
          id: u.id,
          nombre: u.nombre,
          apellidos: u.apellidos,
          edad: u.edad,
          fav: favs?.reduce((p,f) => p || f.id == u.id, false)??false
        }
      }
    )
    return us;
  }
}
