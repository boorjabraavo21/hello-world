import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user';
import { UserInfoFavClicked } from '../userinfofavclicked';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  @Input() user:User|null = null;

  @Output() onFavClicked:EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();

  onFavClick (event:any) {
    this.onFavClicked.emit ({
      fav:!(this.user?.fav??false)
    });
    event.stopPropagation();
  }
  
  constructor() { }

  ngOnInit() {}

}
