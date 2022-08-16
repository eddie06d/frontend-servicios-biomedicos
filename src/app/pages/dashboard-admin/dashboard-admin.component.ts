import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  user: any = {};
  links: any[] = [
    {
      name: 'Datos Generales Deportistas',
      href: 'data-users'
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

}
