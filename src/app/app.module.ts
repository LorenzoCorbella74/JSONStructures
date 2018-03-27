// MODULES
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { AddDialogueComponent } from './app/components/add-dialogue/add-dialogue.component';


@NgModule({
  declarations: [
    AppComponent, AddDialogueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule
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
