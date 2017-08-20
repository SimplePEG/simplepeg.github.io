import 'hammerjs';
import 'brace';
import 'brace/theme/github';
import 'brace/mode/ruby';

import { RouterModule, Routes } from '@angular/router';

import { AceEditorComponent } from 'ng2-ace-editor';
import { AceEditorModule } from 'ng2-ace-editor';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { DocumentationComponent } from './documentation/documentation.component';
import { HomeComponent } from './home/home.component';
import { LanguagesComponent } from './languages/languages.component';
import { LanguagesService } from 'app/languages/languages.service';
import { MdButtonModule } from '@angular/material';
import { MdCardModule } from '@angular/material';
import { MdTabsModule } from '@angular/material';
import { MdToolbarModule } from '@angular/material';
import { MyAceEditorComponent } from './shared/AppAceEditor';
import { NgModule } from '@angular/core';
import { PlaygroundComponent } from './playground/playground.component';
import { StartComponent } from './start/start.component';
import { VisitorsComponent } from './visitors/visitors.component';

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
      appRoutes,  { useHash: true } // ,{ enableTracing: true }
    ),
    MdToolbarModule,
    MdTabsModule,
    MdButtonModule,
    MdCardModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MyAceEditorComponent,
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
