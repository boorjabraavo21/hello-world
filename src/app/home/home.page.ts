import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserInfoFavClicked } from './userinfofavclicked';
import { ModalController, ToastController, ToastOptions } from '@ionic/angular';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FavService } from '../fav.service';
import { zip } from 'rxjs';
import { UserDetailComponent } from '../shared/user-detail/user-detail.component';

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
    public favs:FavService,
    private modal:ModalController
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

  public favPage(){
    this.router.navigate(['/fav-page']);
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

  public async onCardClicked(user:User){
    var onDismiss = (info:any) => {
      switch (info.role) {
        case 'ok': {
          this.users.updateUser(info.data).subscribe(async user => {
            const options:ToastOptions = {
              message:"User updated",
              duration:1000,
              position:'bottom',
              color:'tertiary',
              cssClass:'card-ion-toast'
            };
            const toast = await this.toast.create(options);
            toast.present();
          })
          break;
        }
        case 'delete': {
          this.users.deleteUser(info.data).subscribe(async user => {
            const options:ToastOptions = {
              message:"User deleted",
              duration:1000,
              position:'bottom',
              color:'danger',
              cssClass:'card-ion-toast'
            };
            const toast = await this.toast.create(options);
            toast.present();
          })
          break;
        }
        default:
          console.error("No debería entrar");
          break;
      }
    }
    this.presentForm(user, onDismiss)
  }

  async presentForm(data:User|null, onDismiss:(result:any)=>void) {
    const modal = await this.modal.create({
      component:UserDetailComponent,
      componentProps:{
        user:data
      },
      cssClass:"modal-full-right-side"
    });
    modal.present()
    modal.onDidDismiss().then(result=>{
      if(result && result.data) {
        onDismiss(result);
      }
    })
  }

  onNewUser() {
    var onDismiss = (info:any) => {
      switch(info.role) {
        case 'ok': {
          this.users.addUser(info.data).subscribe(async user=>{
            const options:ToastOptions = {
              message:`User created`,
              duration: 1000,
              position: 'bottom',
              color:'tertiary',
              cssClass: 'fav-ion-toast'
            };
            const toast = await this.toast.create(options);
            toast.present();
          })
          break;
        }
        default:
          console.error("No debería entrar");
          break;
      }
    }
    this.presentForm(null, onDismiss)
  }
}