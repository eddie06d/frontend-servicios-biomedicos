import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  validSpecificError(type: string, control: any): boolean {
    return control.hasError(type) && (control.dirty || control.touched);
  }

  validGeneralError(control: any): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit() {
    this.authSvc.register(this.form.value).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Operación exitosa',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          const { token, user } = res;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard-user']);
        });
      },
      error: err => console.log(err)
    });
  }
}
