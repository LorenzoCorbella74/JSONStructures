import { LocalStorageService } from './../../services/locastorage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddDialogueComponent } from '../add-dialogue/add-dialogue.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  
  projects:        any[];
  selectedProject: any = {};
  streams:         any[];
  displayedColumns = [ 'name', 'structures', 'actions'];

  loading = false;

  constructor(
    public dialog: MatDialog,
    private _router: Router,
    private mem: LocalStorageService
  ) {}

  ngOnInit() { 
    this.projects = [
      { id: '1', name: 'Esempio 1', description: 'bla bla...', category: 'Personale', createdAt: '', streams: [] },
      { id: '2', name: 'Esempio 2', description: 'bla bla...', category: 'Lavoro', createdAt: '', streams: [] },
      { id: '3', name: 'Esempio 3', description: 'bla bla...', category: 'Personale', createdAt: '', streams: [] },
      { id: '4', name: 'Esempio 4', description: 'bla bla...', category: 'Lavoro', createdAt: '', streams: [] },
    ];

    const sel = this.mem.get('selectedProject');
    if (sel) {
      this.selectedProject = sel;
      this.loadStreams(this.selectedProject.id);
    }
  }

  loadStreams(id: number) {
    this.loading = true;
    this.streams = [];
    // MOCK DATA
    setTimeout(() => {
      this.loading = false;
      this.streams = [
        { id: 1, name: 'customerManagement', structures: [
          {id:1, name:'read'},{id:2, name:'ibans'},{id:3, name:'yourdesire'},{id:4, name:'myfortune'}
        ], createdAt: '' },
        { id: 2, name: 'customerProducts', structures: [{id:6, name:'readMe'},{id:7, name:'profiles'}], createdAt: '' },
        { id: 3, name: 'FiscalCode', structures:[{id:8, name:'YoyrProfile'},{id:9, name:'myProfiles'}], createdAt: '' },
        { id: 4, name: 'nationalities', structures: [], createdAt: '' }
      ];
    }, 1000);
  }

  openEditProject(obj: any) {
    const dialogRef = this.dialog.open(AddDialogueComponent, {
      height: '450px',
      width: '600px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      obj = result;
    });
  }

  deleteProject(proj: any) {
    this.projects = this.projects.filter(e => e.id !== proj.id);
  }

  openAddProject() {
    const dialogRef = this.dialog.open(AddDialogueComponent, {
      height: '450px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ', result);
      this.projects.push(result);
    });
  }

  onSelect(project: any): void {
    this.selectedProject = project;
    this.mem.set('selectedProject', project);
    // si caricano gli stream del progetto
    this.loadStreams(project.id);
  }

  openAddStream(){

  }

  editStream(stream: any) {
    console.log(stream);
  }

  deleteStream(stream: any) {
    console.log(stream);
  }

  goToStream(stream: any) {
    this._router.navigate(['/structures', stream.id]);
  }

}
