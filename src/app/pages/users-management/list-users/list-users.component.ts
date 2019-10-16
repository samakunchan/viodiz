import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  public listUser$: Observable<any>;
  public test;
  constructor(private userService: UsersService) {}

  ngOnInit() {
    // this.listUser$ = this.userService.loadAllUsers();
  }
}
