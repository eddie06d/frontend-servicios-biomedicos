import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  usersFilter: any[] = [];
  info_personal: any = {};
  info_health: any = {};

  constructor(private userSvc: UserService) { }

  ngOnInit(): void {
    this.userSvc.getUsers().subscribe({
      next: (res: any) => {
        this.users = res.users.filter((user: any) => user.email !== 'eddie_06@outlook.com');
        this.usersFilter = this.users;
      },
      error: err => console.log(err)
    });
  }

  filterBySport(e: any) {
    const value = e.target.value;
    if(value.length === 0) {
      this.usersFilter = this.users;
      return;
    }
    this.usersFilter = this.users.filter((user: any) => user.info_personal.sport == value);
  }

  filterByDni(e: any) {
    const value = e.target.value;
    if(value.length === 0) {
      this.usersFilter = this.users;
      return;
    }
    this.usersFilter = this.users.filter((user: any) => user.info_personal.dni.startsWith(value));
  }

  onPersonalData(user: any) {
    this.userSvc.getUserById(user._id).subscribe({
      next: (res: any) => this.info_personal = res.user.info_personal,
      error: err => console.log(err)
    });
  }

  onHealthData(user: any) {
    this.userSvc.getUserById(user._id).subscribe({
      next: (res: any) => this.info_health = res.user.info_health,
      error: err => console.log(err)
    });
  }

}
