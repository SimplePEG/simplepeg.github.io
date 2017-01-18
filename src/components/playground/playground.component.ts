import { Component, OnInit } from '@angular/core';
import template from './playground.component.html!text'
import style from './playground.component.css!text'

@Component({
	selector: 'playground',
	template,
    styles: [ style ]
})

export class PlaygroundComponent implements OnInit {

	ngOnInit() { }
}