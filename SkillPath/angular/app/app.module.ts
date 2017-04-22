import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AnimationModule } from '@angular/platform-browser/animations';
import { browser } from 'protractor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavigationMenuComponent } from './templates/navigation-menu/navigation-menu.component';


//import { AnimationModule } from "@angular/platform-browser/animations"
import 'hammerjs';
import { BrowseTutorialsPageComponent } from './pages/browse-tutorials-page/browse-tutorials-page.component';
import { SubmitTutorialPageComponent } from './pages/submit-tutorial-page/submit-tutorial-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    BrowseTutorialsPageComponent,
    SubmitTutorialPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
