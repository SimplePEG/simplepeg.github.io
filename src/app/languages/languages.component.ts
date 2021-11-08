import { Component } from '@angular/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent {

  public languages = [
    {
      name: 'JavaScript',
      github: 'https://github.com/SimplePEG/JavaScript'
    },
    {
      name: 'Python',
      github: 'https://github.com/SimplePEG/Python'
    }
  ]

  notImplemented() {
    alert('Not implemented')
  }

  goToGitHub(language: any) {
    window.open(language.github)
  }

}
