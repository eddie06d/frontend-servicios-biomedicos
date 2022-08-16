import { DniService } from './../../services/dni.service';
import { PersonalDataService } from './../../services/personal-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {
  form!: FormGroup;
  info_personal: any = {};
  isEdit!: boolean;
  id!: string;

  constructor(
    private fb: FormBuilder,
    private personalDataSvc: PersonalDataService,
    private dniSvc: DniService
    ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      typeDocument: ['', Validators.required],
      dni: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      dateBirth: ['', Validators.required],
      street: ['', Validators.required],
      department: ['', Validators.required],
      province: ['', Validators.required],
      district: ['', Validators.required],
      sport: ['', Validators.required],
      terminos: ['', Validators.required],
    });
    this.id = JSON.parse(localStorage.getItem('user')!)._id;
    this.personalDataSvc.get(this.id).subscribe({
      next: (res: any) => {
        this.info_personal = res.personal_information;
        this.isEdit = true;
      },
      error: err => {
        if(err) this.isEdit = false;
      },
      complete: () => this.initForm()
    });
  }

  onSubmit() {
    const { firstName, lastName, dni, phone, gender, dateBirth, street, department, province, district, sport } = this.form.value;
    const body = {
      firstName, lastName, dni, phone, gender, dateBirth, sport, address: { street, department, province, district }
    };
    this.personalDataSvc.save(body, this.id).subscribe({
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

  initForm() {
    if(this.isEdit) {
      const { firstName, lastName, dni, phone, gender, dateBirth, address, sport } = this.info_personal;
      const { street, department, province, district } = address;
      this.form.patchValue({
        firstName, lastName, phone, gender,
        dateBirth, dni, street, department,
        province, district, sport
      });
    }
  }

  onCheckDni() {
    const { dni } = this.form.value;
    if(dni.length !== 8) return;
    this.dniSvc.checkDni(dni).subscribe({
      next: (res: any) => {
        if(res.message == 'No se encontraron resultadoss.') {
          Swal.fire({
            title: 'DNI inválido',
            text: 'Por favor, ingrese un DNI válido',
            icon: 'error',
            timer: 2000,
            timerProgressBar: true
          });
          this.form.controls['firstName'].setValue('');
          this.form.controls['lastName'].setValue('');
          return;
        };
        const lastName = `${res.apellidoPaterno} ${res.apellidoMaterno}`;
        const firstName = res.nombres;
        this.form.controls['firstName'].setValue(firstName);
        this.form.controls['lastName'].setValue(lastName);
      },
      error: err => console.log(err)
    });
  }

}
