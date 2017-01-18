import { Component, OnInit } from '@angular/core';
import template from './doc.component.html!text'
import style from './doc.component.css!text'

@Component({
	selector: 'doc',
	template,
    styles: [ style ]
})

export class DocComponent implements OnInit {

	ngOnInit() { }
}