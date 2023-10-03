import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user';
import { UserInfoFavClicked } from '../userinfofavclicked';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  @Input() user:User|null = null;

  @Output() onFavClicked:EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();
  @Output() onCardClicked:EventEmitter<void> = new EventEmitter<void>();
  @Output() onDeleteClicked:EventEmitter<void> = new EventEmitter<void>();

  onFavClick (event:any) {
    this.onFavClicked.emit ({
      fav:!(this.user?.fav??false)
    });
    event.stopPropagation();
  }

  onCardClick(){
    this.onCardClicked.emit();
  }

  onDeleteClick(event:any) {
    this.onDeleteClicked.emit();
    event.stopPropagation();
  }
  
  constructor(
    private router:Router
  ) { }

  ngOnInit() {}

}
