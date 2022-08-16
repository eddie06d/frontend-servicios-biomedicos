import { PersonalDataService } from './../../services/personal-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-user',
  templateUrl: './welcome-user.component.html',
  styleUrls: ['./welcome-user.component.css']
})
export class WelcomeUserComponent implements OnInit {
  info_personal: any = {};
  id!: string;

  constructor(private personalDataSvc: PersonalDataService) { }

  ngOnInit(): void {
    this.id = JSON.parse(localStorage.getItem('user')!)._id;
    this.personalDataSvc.get(this.id).subscribe({
      next: (res: any) => {
        this.info_personal = res.personal_information;
      },
      error: err => console.log(err),
    });
  }

}
