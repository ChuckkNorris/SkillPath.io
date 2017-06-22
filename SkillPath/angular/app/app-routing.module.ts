import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { TeachPageComponent } from './pages/teach-page/teach-page.component';
import { LearnPageComponent } from './pages/learn-page/learn-page.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthenticationGuard } from "./services/authentication-guard.service";
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'learn', component: LearnPageComponent,
  //  canActivate: [AuthenticationGuard]
  },
  { path: 'teach', component: TeachPageComponent, 
  //  canActivate: [AuthenticationGuard] 
  },
  {
    path: 'teach/:id', component: TeachPageComponent,
  //  canActivate: [AuthenticationGuard]
  },
  { path: 'admin', component: AdminPageComponent, 
  //  canActivate: [AuthenticationGuard] 
  },
  { path: 'login', component: LoginPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }