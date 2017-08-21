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
  public visitor = '';

  public grammarError = '';
  public textError = '';

  public converted_ast: any;
  public ast: any;
  public meta: any;

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
      })
      .debounceTime(1000).subscribe((grammar: string) => {
        console.log('grammar', grammar);
        this.router.navigate([], {
          queryParams: {
            g: encodeURIComponent(grammar),
            t: encodeURIComponent(this.text)
          }
        });
        this.ast = null;
        this.meta = null;
        this.grammar = grammar;
        this.grammarError = '';
        this.textError = '';
        this.parseGrammar(grammar);
        this.parseText(this.text);
      });

    Observable.create((obs) => this.$text = obs)
      .do(() => {
        // block ui
      })
      .debounceTime(300).subscribe((text: string) => {
        this.router.navigate([], {
          queryParams: {
            g: encodeURIComponent(this.grammar),
            t: encodeURIComponent(text)
           }
        });
        this.ast = null;
        this.meta = null;
        this.text = text;
        this.textError = '';
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
    this.meta = parser.state;
    console.log(this.meta)
  }

  onGrammarChange(code) {
    this.$grammar.next(code);
  }

  onTextChange(code) {
    this.$text.next(code);
  }

  generateVisitor() {
    if (!this.meta) {
      alert('no parsed text');
      return;
    }
    this.visitor =  '(function visitor() {\n  return {\n' + this.meta.rules.map((rule) =>
      (`    ${rule.name}: function(node) {\n        return node;\n    }`)
     ).join(',\n')
    + '\n  }\n})';

    this.visitAst();
  }

  visitAst() {
    if (!this.ast) {
      alert('No result to visit');
      return;
    }
    let visitor = eval(this.visitor)();
    this.converted_ast = this.visitNode(JSON.parse(JSON.stringify(this.ast)), visitor);
  }

  visitNode(node, visitor): any {
    if (node.children) {
      node.children = node.children.map((child) => child && this.visitNode(child, visitor));
    }
    if (node.rule && visitor[node.rule]) {
      return visitor[node.rule](node);
    }
    return node;
  }

  onVisitorChange(code) {
    this.visitor = code;
    this.visitAst();
  }

}
