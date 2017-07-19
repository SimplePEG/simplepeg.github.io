import { LanguagesService } from 'app/languages/languages.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {

  constructor(
    public languagesService: LanguagesService,
  ) { }

  ngOnInit() {
  }

  notImplemented() {
    alert('Not implemented')
  }

  goToGitHub(language: any) {
    window.open(language.github)
  }

}
