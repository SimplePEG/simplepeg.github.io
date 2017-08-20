import { AceEditorComponent } from 'ng2-ace-editor';
import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ace-editor',
  template: '',
  styles: [':host { display:block;width:100%; }'],
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AceEditorComponent),
      multi: true
  }]
})
export class MyAceEditorComponent extends AceEditorComponent {
    init() {
        super.init();
        this._editor.$blockScrolling = Infinity;
    }
}
