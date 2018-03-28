import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-add-dialogue',
  templateUrl: './add-dialogue.component.html',
  styleUrls: ['./add-dialogue.component.scss']
})
export class AddDialogueComponent implements OnInit {

  project: any = {
    name: '',
    description: '',
    category: '',
    createdAt: new Date()
  };

  constructor(public thisDialogRef: MatDialogRef<AddDialogueComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
    if (this.data) {
      this.project = this.data;
    }
  }

  onCloseConfirm() {
    this.thisDialogRef.close(this.project);
  }

  onCloseCancel() {
    this.thisDialogRef.close();
  }

}
