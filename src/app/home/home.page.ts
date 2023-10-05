import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserInfoFavClicked } from './userinfofavclicked';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FavService } from '../fav.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  
  public loading:boolean = false;

  constructor(
    private router:Router,
    private toast:ToastController,
    public users:UserService,
    public favs:FavService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    zip(this.users.getAll(),this.favs.getAll()).subscribe(results=> {
      this.loading = false;
    });
  }

  public onFavClicked(user:User, event:UserInfoFavClicked) {
    var obs = (event?.fav)?this.favs.addFav(user.id):this.favs.deleteFav(user.id);
    obs.subscribe({
      next: user=>{
        const options:ToastOptions = {
          message:`User ${event.fav?'added':'removed'} ${event.fav?'to':'from'} favourites`,
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
    });
  }

  public welcome(){
    this.router.navigate(['/welcome']);
  }

  public onDeleteClicked(user:User) {
    var _user = {...user};
    this.users.deleteUser(_user).subscribe({
      next: user=> {
        const options:ToastOptions = {
          message:`User deleted`,
          duration: 1000,
          position: 'bottom',
          color: 'danger',
          cssClass: 'fav-ion-toast'
        };
        this.toast.create(options).then(toast=>toast.present());
      },
      error: err=> {
        console.log(err);
      }
    });
  }

  public async onCardClicked(){
    const options:ToastOptions = {
      message:"User clicked the card",
      duration:1000,
      position:'bottom',
      color:'tertiary',
      cssClass:'card-ion-toast'
    };
    const toast = await this.toast.create(options);
    toast.present();
  }
}