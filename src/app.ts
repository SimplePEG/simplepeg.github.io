import { Component } from '@angular/core'
import template from './app.html!text';

@Component({
	selector: 'my-app',
	template,
})
export class App {
	name:string;
	constructor() {
		this.name = 'Angular X'
	}
}