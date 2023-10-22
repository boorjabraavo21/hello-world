import { Component, OnInit } from '@angular/core';
import { FavService } from '../fav.service';
import { ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';
import { User } from '../home/user';
import { UserService } from '../user.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-fav-page',
  templateUrl: './fav-page.page.html',
  styleUrls: ['./fav-page.page.scss'],
})
export class FavPagePage implements OnInit {

  public loading:boolean = false;

  constructor(
    public favs:FavService,
    public users:UserService,
    private toast:ToastController,
    private router:Router
  ) { }

  ngOnInit() {
    this.loading = true;
    zip(this.users.getAll(),this.favs.getAll()).subscribe(results=> {
      results.find(us => us.find(u => u.id))
      this.loading = false;
    });
  }

  public home() {
    this.router.navigate(['/home'])
  }

  public onFavClicked(user:User) {
    var obs = this.favs.deleteFav(user.id);
    obs.subscribe ({
      next: user=>{
        const options:ToastOptions = {
          message:`User removed from favourites`,
          duration: 1000,
          position: 'bottom',
          color: 'danger',
          cssClass: 'fav-ion-toast'
        };
        this.toast.create(options).then(toast=>toast.present());
        },
        error: err=>{
          console.log(err);
        }
    })
  }

}
