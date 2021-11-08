import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { LanguagesComponent } from './languages/languages.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'playground', loadChildren: () => import('./playground/playground.module').then(m => m.PlaygroundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
