import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {

  @Input() user?: {
    nombre?: string,
    apellidos?: string,
    edad?: number
  }

  constructor() { }

  ngOnInit() {}

}
