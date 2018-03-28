import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddDialogueComponent } from '../add-dialogue/add-dialogue.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: any[];

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {

    this.projects = [
      { id: '1', name: 'Esempio 1', description: 'bla bla...', category: 'Personale', createdAt: '', streams: [] },
      { id: '2', name: 'Esempio 2', description: 'bla bla...', category: 'Lavoro', createdAt: '', streams: [] },
      { id: '3', name: 'Esempio 3', description: 'bla bla...', category: 'Personale', createdAt: '', streams: [] },
      { id: '4', name: 'Esempio 4', description: 'bla bla...', category: 'Lavoro', createdAt: '', streams: [] },
    ];

  }

  openEditDialog(obj: any) {
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


  openAddDialog() {
    const dialogRef = this.dialog.open(AddDialogueComponent, {
      height: '450px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ', result);
      this.projects.push(result);
    });
  }

  showInfo(id) {
    console.log(id);
  }

}
