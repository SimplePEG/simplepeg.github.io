import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { App } from './app'

@NgModule({
	imports: [ BrowserModule ],
	declarations: [ App ],
	bootstrap: [ App ]
})
export class AppModule {}