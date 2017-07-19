import { Injectable } from '@angular/core';

@Injectable()
export class LanguagesService {

  languages = [
    {
      name: 'JavaScript',
      github: 'https://github.com/SimplePEG/JavaScript'
    },
     {
      name: 'Python',
      github: 'https://github.com/SimplePEG/Python'
    }
  ]

  constructor() { }
}
