import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { HomeComponent } from './components/home/home.component'
import { PlaygroundComponent } from './components/playground/playground.component'
import { GalleryComponent } from './components/gallery/gallery.component'
import { DocComponent } from './components/doc/doc.component'
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component'

const appRoutes: Routes = [
    { 
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    { 
        path: 'playground',
        component: PlaygroundComponent
    },
    { 
        path: 'gallery',
        component: GalleryComponent
    },
    { 
        path: 'doc',
        component: DocComponent
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
        PlaygroundComponent,
        GalleryComponent,
        DocComponent,
        PageNotFoundComponent
    ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}