import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  links: any[] = [
    {
      name: 'Datos personales',
      href: 'personal-data'
    },
    {
      name: 'Datos de salud',
      href: 'health-data'
    },
    {
      name: 'Historial clínico',
      href: 'medical-history'
    }
  ];
  user: any = {};

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

}
