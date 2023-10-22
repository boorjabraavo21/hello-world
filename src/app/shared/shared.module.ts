import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../highlight.directive';
import { FavsPipe } from '../home/favs.pipe';
import { UserInfoComponent } from '../home/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';



@NgModule({
  declarations: [HighlightDirective, FavsPipe, UserInfoComponent, UserDetailComponent],
  imports: [
    CommonModule, IonicModule, FormsModule, ReactiveFormsModule
  ],
  exports: [CommonModule, IonicModule, FormsModule, HighlightDirective, FavsPipe, UserInfoComponent, UserDetailComponent]
})
export class SharedModule { }