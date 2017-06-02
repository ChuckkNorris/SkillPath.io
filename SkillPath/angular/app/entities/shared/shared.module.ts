import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { AutoCompleteTestComponent } from './auto-complete-test/auto-complete-test.component';
import { SkillpathApiService } from './services/skillpath-api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule.forRoot(),
    FormsModule,
    RouterModule
  ],
  declarations: [ NavigationMenuComponent],

  providers: [SkillpathApiService]
})
export class SharedModule { }
