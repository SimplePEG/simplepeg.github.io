import { Component } from '@angular/core'
import template from './app.component.html!text'
import style from './app.component.css!text'

@Component({
	selector: 'app',
	template,
    styles: [ style ]
})
export class AppComponent {
    goToGithubPage() {
        window.location.assign('https://github.com/SimplePEG/SimplePEG');
    }
}