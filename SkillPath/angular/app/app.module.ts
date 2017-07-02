import { TutorialLinkExists } from './directives/tutorial-link-exists.directive';
import { LoaderService } from './services/loader.service';
import { ImgurService } from './services/imgur.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationGuard } from './services/authentication-guard.service';
import { ImageService } from './services/image.service';
import { TutorialService } from './services/tutorial.service';
import { CategoryService } from './services/category.service';
import { SkillpathApiService } from './skillpath-api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { AnimationModule } from '@angular/platform-browser/animations';
import { browser } from 'protractor';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
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
import { CategoryListComponent } from './templates/category-list/category-list.component';
import { CategorySearchComponent } from './templates/category-search/category-search.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AutoCompleteTestComponent } from './templates/auto-complete-test/auto-complete-test.component';
import { TutorialListComponent } from './templates/tutorial-list/tutorial-list.component';
import { StaggerGapDirective } from './stagger-gap.directive';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FilePickerModule } from 'angular-file-picker';
import { LoaderComponent } from './templates/loader/loader.component';
import { IcomoonIconComponent } from './templates/icomoon-icon/icomoon-icon.component';
import { AboutTheSiteComponent } from './templates/about-the-site/about-the-site.component';
import { TutorialDetailsComponent } from './templates/tutorial-details/tutorial-details.component';
import { CookieService } from "ngx-cookie-service";
import { CategorySearchRequired } from './directives/category-search-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavigationMenuComponent,
    SubmitTutorialFormComponent,
    LearnPageComponent,
    TeachPageComponent,
    TutorialCardComponent,
    CategoryListComponent,
    CategorySearchComponent,
    AdminPageComponent,
    AutoCompleteTestComponent,
    TutorialListComponent,
    StaggerGapDirective,
    LoginPageComponent,
    LoaderComponent,
    IcomoonIconComponent,
    AboutTheSiteComponent,
    TutorialDetailsComponent,
    CategorySearchRequired,
    TutorialLinkExists
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
    FilePickerModule,
  ],
  entryComponents: [
    SubmitTutorialFormComponent,
    TutorialDetailsComponent
  ],
  providers: [
    SkillpathApiService, 
    CategoryService, 
    TutorialService, 
    ImageService, 
    AuthenticationGuard, 
    AuthenticationService, 
    ImgurService, 
    LoaderService,
    CookieService,
    NgForm
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
