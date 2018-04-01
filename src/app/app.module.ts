// MODULES
import { HttpModule } from '@angular/http';
import { FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
/* import { NgJsonEditorModule } from 'ang-jsoneditor'; */

// ROUTER
import { AppRoutingModule } from './routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { AddDialogueComponent } from './app/components/add-dialogue/add-dialogue.component';
import { ProjectsComponent } from './app/components/projects/projects.component';
import { StructuresComponent } from './app/components/structures/structures.component';

// SERVICES
import { LocalStorageService } from './app/services/locastorage.service';

export function createStorage(){
  return new LocalStorageService('str', 'sessionStorage');
}

@NgModule({
  declarations: [
    AppComponent, ProjectsComponent, AddDialogueComponent, StructuresComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule/* ,
    NgJsonEditorModule */
  ],
  entryComponents: [
    AddDialogueComponent
  ],
  exports: [
  ],
  providers: [
    { provide: LocalStorageService, useFactory: createStorage  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
