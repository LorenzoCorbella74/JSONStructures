// MODULES
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

// ROUTER
import { AppRoutingModule } from './routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { SpinnerComponent } from './app/components/spinner/spinner.component';
import { AddDialogueComponent } from './app/components/add-dialogue/add-dialogue.component';
import { ProjectsComponent } from './app/components/projects/projects.component';
import { StructuresComponent } from './app/components/structures/structures.component';
import { LoginComponent } from './app/components/login/login.component';
import { StreamDialogueComponent } from './app/components/stream-dialogue/stream-dialogue.component';
//  JSONEDITOR
import { JsonEditorComponent } from './app/components/jsoneditor/jsoneditor.component';

// SERVICES
import { LocalStorageService } from './app/services/locastorage.service';
import { AuthenticateService } from './app/services/authenticate.service';
import { CanActivateRouteGuard } from './app/services/can-activate-route.guard';
import { ApiService } from './app/services/api-service';

export function createStorage(){
  return new LocalStorageService('str', 'sessionStorage');
}

@NgModule({
  declarations: [
    SpinnerComponent,
    AppComponent, ProjectsComponent, AddDialogueComponent, StreamDialogueComponent, StructuresComponent, JsonEditorComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  entryComponents: [
    AddDialogueComponent,
    StreamDialogueComponent
  ],
  exports: [
  ],
  providers: [
    { provide: LocalStorageService, useFactory: createStorage  },
    ApiService, AuthenticateService, CanActivateRouteGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
