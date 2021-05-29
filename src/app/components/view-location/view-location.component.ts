import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { MyLocation } from "src/app/models/interfaces";

@Component({
  selector: "app-view-location",
  templateUrl: "./view-location.component.html",
  styleUrls: ["./view-location.component.scss"],
})
export class ViewLocationComponent implements OnInit {
  currLocation: MyLocation;

  constructor(public dialogRef: MatDialogRef<ViewLocationComponent>) {}

  ngOnInit(): void {
    this.currLocation = JSON.parse(localStorage.getItem("currentLocation"));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
