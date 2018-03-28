// MODULES
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

// ROUTER
import { AppRoutingModule } from './routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { AddDialogueComponent } from './app/components/add-dialogue/add-dialogue.component';
import { ProjectsComponent } from './app/components/projects/projects.component';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent, ProjectsComponent, AddDialogueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  entryComponents: [
    AddDialogueComponent
  ],
  exports: [
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
