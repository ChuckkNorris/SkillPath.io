import { SubmitTutorialPageComponent } from './pages/submit-tutorial-page/submit-tutorial-page.component';
import { BrowseTutorialsPageComponent } from './pages/browse-tutorials-page/browse-tutorials-page.component';


import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/browse', pathMatch: 'full' },
  { path: 'browse',  component: BrowseTutorialsPageComponent },
  { path: 'submit', component: SubmitTutorialPageComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}