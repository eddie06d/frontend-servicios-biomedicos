import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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
    this.authSvc.login(this.form.value).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Operación exitosa',
          text: 'Login realizado correctamente',
          icon: 'success',
          timer: 2000,
          timerProgressBar: true
        }).then(() => {
          const { token, user } = res;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          if(user.email == 'eddie_06@outlook.com')
          this.router.navigate(['/dashboard-admin']);
          else this.router.navigate(['/dashboard-user']);
        });
      },
      error: err => console.log(err)
    });
  }

}
