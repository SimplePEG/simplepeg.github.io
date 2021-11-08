import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";

import { PlaygroundRoutingModule } from './playground-routing.module';
import { PlaygroundComponent } from "./playground/playground.component";
import { AceEditorComponent } from "./ace-editor/ace-editor.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [PlaygroundComponent, AceEditorComponent],
  imports: [
    CommonModule,
    PlaygroundRoutingModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule
  ]
})
export class PlaygroundModule { }
