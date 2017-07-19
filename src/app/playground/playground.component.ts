import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

import {SPEG} from 'simplepeg';
const parser = new SPEG();

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  public grammar = `GRAMMAR url

url       ->  scheme "://" host pathname search hash?;
scheme    ->  "http" "s"?;
host      ->  hostname port?;
hostname  ->  segment ("." segment)*;
segment   ->  [a-z0-9-]+;
port      ->  ":" [0-9]+;
pathname  ->  "/" [^ ?]*;
search    ->  ("?" [^ #]*)?;
hash      ->  "#" [^ ]*;
  `;
  public text = 'https://simplepeg.github.io/';
  public result = '';

  public grammarError = '';
  public textError = '';

  public ast: any;

  public $grammar: Observer<string>;
  public $text: Observer<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    const g = this.route.snapshot.queryParams['g'];
    const t = this.route.snapshot.queryParams['t'];

    if (g && t) {
        this.grammar = decodeURIComponent(g);
        this.text = decodeURIComponent(t);
    }

    this.parseGrammar(this.grammar);
    this.parseText(this.text);

    Observable.create((obs: Observer<string>) => this.$grammar = obs)
      .do((grammar: string) => {
        // block ui
        this.grammarError = '';
      })
      .debounceTime(1000).subscribe((grammar: string) => {
        this.router.navigate([], {
          queryParams: {
            g: encodeURIComponent(grammar),
            t: encodeURIComponent(this.text)
          }
        });
        this.parseGrammar(grammar);
      });

    Observable.create((obs) => this.$text = obs)
      .do(() => {
        // block ui
        this.textError = '';
      })
      .debounceTime(1000).subscribe((text: string) => {
        this.router.navigate([], {
          queryParams: {
            g: encodeURIComponent(this.grammar),
            t: encodeURIComponent(text)
           }
        });
        this.parseText(text);
      });
  }

  parseGrammar(grammar) {
      try {
        parser.parse_grammar(grammar);
      } catch (e) {
        this.grammarError = e.message;
      }
  }

  parseText(text) {
    try {
      this.ast = parser.parse_text(text);
    } catch (e) {
      this.textError = e.message;
    }
  }

  onGrammarChange(code) {
    this.$grammar.next(code);
  }

  onTextChange(code) {
    this.$text.next(code);
  }

}
