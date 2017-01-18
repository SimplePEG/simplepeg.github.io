import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { MaterialModule } from '@angular/material';

import { AppComponent } from './components/app/app.component'

@NgModule({
	imports: [ BrowserModule, MaterialModule.forRoot() ],
	declarations: [ AppComponent ],
	bootstrap: [ AppComponent ]
})
export class AppModule {}