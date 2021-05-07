import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/interfaces';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss'],
})
export class ViewDetailsComponent implements OnInit {
  currCategory: Category;

  constructor(public dialogRef: MatDialogRef<ViewDetailsComponent>) {}

  ngOnInit() {
    this.currCategory = JSON.parse(localStorage.getItem('currentCategory'));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
