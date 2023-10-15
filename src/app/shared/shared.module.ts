import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from '../highlight.directive';
import { FavsPipe } from '../home/favs.pipe';
import { UserInfoComponent } from '../home/user-info/user-info.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HighlightDirective, FavsPipe, UserInfoComponent],
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  exports: [CommonModule, IonicModule, FormsModule, HighlightDirective, FavsPipe, UserInfoComponent]
})
export class SharedModule { }