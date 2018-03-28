import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

// COMPONENTS
import { ProjectsComponent } from './app/components/projects/projects.component';

const routes: Routes = [
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: 'projects', component: ProjectsComponent }/* ,
  { path: 'structures', component: ProjectsComponent } */
]
@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
