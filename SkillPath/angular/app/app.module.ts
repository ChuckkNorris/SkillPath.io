import { SharedModule } from './entities/shared/shared.module';
import { TutorialModule } from './entities/tutorial/tutorial.module';
import { CategoryModule } from './entities/category/category.module';
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


import { Ng2CompleterModule } from "ng2-completer";
//import { AnimationModule } from "@angular/platform-browser/animations"
import 'hammerjs';

import { LearnPageComponent } from './pages/learn-page/learn-page.component';
import { TeachPageComponent } from './pages/teach-page/teach-page.component';

import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { SubmitTutorialFormComponent } from './entities/tutorial/submit-tutorial-form/submit-tutorial-form.component';

@NgModule({
  declarations: [
    AppComponent,
   
    LearnPageComponent,
    TeachPageComponent,
    
    AdminPageComponent,
    SubmitTutorialFormComponent
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
    ReactiveFormsModule,
     SharedModule,
    CategoryModule,
    TutorialModule,
  ],
  entryComponents: [
    SubmitTutorialFormComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
