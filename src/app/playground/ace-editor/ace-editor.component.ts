import { EventEmitter, NgZone, OnDestroy, OnInit, Output } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Component, Input } from "@angular/core";

import * as ace from "ace-builds";

import "brace";
import "brace/theme/monokai";

/**
 * import from
 * https://github.com/fxmontigny/ng2-ace-editor/blob/master/src/component.ts
 */
@Component({
  selector: 'app-ace-editor',
  template: '',
  styles: [':host { display:block;width:100%; }'],
})
export class AceEditorComponent implements OnInit, OnDestroy {
  @Input() set text(text: string) {
    this.setText(text);
  }
  @Input() set mode(mode: any) {
    this.setMode(mode);
  }

  @Output() textChanged = new EventEmitter();

  _editor: any;
  _theme: string = "monokai";
  _mode: any = "html";
  _text: string = "";
  _durationBeforeCallback: number = 0;
  oldText: any;
  timeoutSaving: any;

  constructor(elementRef: ElementRef, private zone: NgZone) {
    let el = elementRef.nativeElement;
    this.zone.runOutsideAngular(() => {
      ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
      this._editor = ace['edit'](el);
    });
    this._editor.$blockScrolling = Infinity;
  }

  ngOnInit() {
    this.init();
    this.initEvents();
  }

  ngOnDestroy() {
    this._editor.destroy();
  }

  private init() {
    this.setTheme(this._theme);
    this.setMode(this._mode);
  }

  private initEvents() {
    this._editor.on('change', () => this.updateText());
    this._editor.on('paste', () => this.updateText());
  }

  private setTheme(theme: any) {
    this._theme = theme;
    this._editor.setTheme(`ace/theme/${theme}`);
  }

  private setMode(mode: any) {
    this._mode = mode;
    if (typeof this._mode === 'object') {
      this._editor.getSession().setMode(this._mode);
    } else {
      this._editor.getSession().setMode(`ace/mode/${this._mode}`);
    }
  }

  setText(text: any) {
    if (text === null || text === undefined) {
      text = "";
    }

    if (this._text !== text) {
      this._text = text;
      this._editor.setValue(text);
      this._editor.clearSelection();
    }
  }

  private updateText() {
    let newVal = this._editor.getValue();
    if (newVal === this.oldText) {
      return;
    }
    if (!this._durationBeforeCallback) {
      this._text = newVal;
      this.zone.run(() => {
        this.textChanged.emit(newVal);
      });
    } else {
      if (this.timeoutSaving) {
        clearTimeout(this.timeoutSaving);
      }

      this.timeoutSaving = setTimeout(() => {
        this._text = newVal;
        this.zone.run(() => {
          this.textChanged.emit(newVal);
        });
        this.timeoutSaving = null;
      }, this._durationBeforeCallback);
    }
    this.oldText = newVal;
  }

}
