import { Component, OnInit } from '@angular/core';
import template from './home.component.html!text'
import style from './home.component.css!text'

@Component({
	selector: 'home',
	template,
    styles: [ style ]
})
export class HomeComponent implements OnInit {
	ngOnInit() { }
}