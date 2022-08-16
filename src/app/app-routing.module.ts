import { UsersListComponent } from './pages/users-list/users-list.component';
import { WelcomeAdminComponent } from './pages/welcome-admin/welcome-admin.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { MedicalHistoryComponent } from './pages/medical-history/medical-history.component';
import { WelcomeUserComponent } from './pages/welcome-user/welcome-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardUserComponent } from './pages/dashboard-user/dashboard-user.component';
import { HealthDataComponent } from './pages/health-data/health-data.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PersonalDataComponent } from './pages/personal-data/personal-data.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'dashboard-user',
    component: DashboardUserComponent,
    children: [
      { path: '', component: WelcomeUserComponent },
      { path: 'personal-data', component: PersonalDataComponent },
      { path: 'health-data', component: HealthDataComponent },
      { path: 'medical-history', component: MedicalHistoryComponent }
    ]
  },
  {
    path: 'dashboard-admin',
    component: DashboardAdminComponent,
    children: [
      { path: '', component: WelcomeAdminComponent },
      { path: 'data-users', component: UsersListComponent }
    ]
  },
  { path: '**', redirectTo: 'signin'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
