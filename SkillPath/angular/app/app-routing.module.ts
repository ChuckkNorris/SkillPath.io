import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { TeachPageComponent } from './pages/teach-page/teach-page.component';
import { LearnPageComponent } from './pages/learn-page/learn-page.component';

import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/learn', pathMatch: 'full' },
  { path: 'learn',  component: LearnPageComponent },
  { path: 'teach', component: TeachPageComponent },
  { path: 'admin', component: AdminPageComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}