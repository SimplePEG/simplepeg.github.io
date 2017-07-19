import 'hammerjs';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { StartComponent } from './start/start.component';
import { LanguagesComponent } from './languages/languages.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { PlaygroundComponent } from './playground/playground.component';
import { RouterModule, Routes } from '@angular/router';
import { LanguagesService } from 'app/languages/languages.service';
import { AceEditorModule } from 'ng2-ace-editor';

import * as ace from 'brace';
import 'brace/theme/github';
import 'brace/mode/ruby';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quick-start', component: StartComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'visitors', component: VisitorsComponent },
  { path: 'documentation', component: DocumentationComponent },
  { path: 'playground', component: PlaygroundComponent },
];

@NgModule({
  imports: [
    AceEditorModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes // ,{ enableTracing: true }
    ),
    MdToolbarModule,
    MdButtonModule,
    MdCardModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
    LanguagesComponent,
    DocumentationComponent,
    VisitorsComponent,
    PlaygroundComponent,
  ],
  providers: [
    LanguagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
