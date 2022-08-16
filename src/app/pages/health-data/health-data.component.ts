import { HealthDataService } from './../../services/health-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal  from 'sweetalert2';

@Component({
  selector: 'app-health-data',
  templateUrl: './health-data.component.html',
  styleUrls: ['./health-data.component.css']
})
export class HealthDataComponent implements OnInit {
  form!: FormGroup;
  info_health: any = {};
  isEdit!: boolean;
  id!: string;

  constructor(private fb: FormBuilder, private healthDataSvc: HealthDataService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      age: ['', Validators.required],
      heigth: ['', Validators.required],
      weigth: ['', Validators.required],
      bloodType: ['', Validators.required],
      diseases: ['', Validators.required],
      allergies: ['', Validators.required],
      terms: ['', Validators.required],
    });
    this.id = JSON.parse(localStorage.getItem('user')!)._id;
    this.healthDataSvc.get(this.id).subscribe({
      next: (res: any) => {
        this.info_health = res.health_information;
        this.isEdit = true;
      },
      error: err => {
        if(err) this.isEdit = false;
      },
      complete: () => this.initForm()
    });
  }

  onSubmit() {
    const { age, heigth, weigth, bloodType, diseases, allergies } = this.form.value;
    const body = {
      age, heigth, weigth, bloodType, diseases, allergies
    };
    this.healthDataSvc.save(body, this.id).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Operación exitosa',
          text: 'Los datos se han guardado correctamente',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true
        });
      },
      error: err => console.log(err)
    });
  }

  private initForm() {
    if(this.isEdit) {
      const { age, heigth, weigth, bloodType, diseases, allergies } = this.info_health;
      this.form.patchValue({
        age, heigth, weigth, bloodType, diseases, allergies
      });
    }
  }

}
