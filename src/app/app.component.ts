import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddDialogueComponent } from './app/components/add-dialogue/add-dialogue.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  projects: any[] = [
    { id: '1', name: 'Structures', description: 'bla bla...', ambito: 'Personale' },
    { id: '2', name: 'Passwords', description: 'bla bla...', ambito: 'Personale' }
  ];

  constructor(public dialog: MatDialog) {

  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddDialogueComponent, {
      height: '450px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showInfo(id) {
    console.log(id);
  }

}