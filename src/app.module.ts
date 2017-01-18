import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

const appRoutes: Routes = [
    { 
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [ 
        BrowserModule, 
        MaterialModule.forRoot(), 
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
	declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundComponent
    ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}