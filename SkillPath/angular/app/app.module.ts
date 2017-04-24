import { CategoryService } from './services/category.service';
import { SkillpathApiService } from './skillpath-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AnimationModule } from '@angular/platform-browser/animations';
import { browser } from 'protractor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavigationMenuComponent } from './templates/navigation-menu/navigation-menu.component';

import { Ng2CompleterModule } from "ng2-completer";
//import { AnimationModule } from "@angular/platform-browser/animations"
import 'hammerjs';
import { SubmitTutorialFormComponent } from './templates/submit-tutorial-form/submit-tutorial-form.component';
import { LearnPageComponent } from './pages/learn-page/learn-page.component';
import { TeachPageComponent } from './pages/teach-page/teach-page.component';
import { TutorialCardComponent } from './templates/tutorial-card/tutorial-card.component';
import { TutorialCategoriesComponent } from './templates/tutorial-categories/tutorial-categories.component';
import { CategorySearchComponent } from './templates/category-search/category-search.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AutoCompleteTestComponent } from './templates/auto-complete-test/auto-complete-test.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    SubmitTutorialFormComponent,
    LearnPageComponent,
    TeachPageComponent,
    TutorialCardComponent,
    TutorialCategoriesComponent,
    CategorySearchComponent,
    AdminPageComponent,
    AutoCompleteTestComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    SubmitTutorialFormComponent
  ],
  providers: [SkillpathApiService, CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
