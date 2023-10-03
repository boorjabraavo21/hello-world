import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserInfoFavClicked } from './userinfofavclicked';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

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
    public users:UserService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.users.getAll().subscribe(users=> {
      this.loading = false;
    });
  }

  onFavClicked(user:User, event:UserInfoFavClicked) {
    var _user:User = {...user};
    _user.fav = event.fav??false;
    this.users.updateUser(_user).subscribe({
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