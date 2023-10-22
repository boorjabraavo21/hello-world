import { NgModule } from '@angular/core';

import { FavPagePageRoutingModule } from './fav-page-routing.module';

import { FavPagePage } from './fav-page.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FavPagePageRoutingModule
  ],
  declarations: [FavPagePage]
})
export class FavPagePageModule {}
