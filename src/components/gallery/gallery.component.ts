import { Component, OnInit } from '@angular/core';
import template from './gallery.component.html!text'
import style from './gallery.component.css!text'

@Component({
	selector: 'gallery',
	template,
    styles: [ style ]
})

export class GalleryComponent implements OnInit {

	ngOnInit() { }
}