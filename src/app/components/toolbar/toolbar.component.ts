import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { Category, MyLocation } from "src/app/models/interfaces";
import { CatergoryService } from "src/app/services/category/catergory.service";
import { LocationService } from "src/app/services/location/location.service";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { AddLocationComponent } from "../add-location/add-location.component";
import { UpdateCategoryComponent } from "../update-category/update-category.component";
import { UpdateLocationComponent } from "../update-location/update-location.component";
import { ViewDetailsComponent } from "../view-details/view-details.component";
import { ViewLocationComponent } from "../view-location/view-location.component";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  currentCategory: Category;
  categoryName: string;

  currentLocation: MyLocation;
  LocationName: string;

  navbarOpen: boolean = false;

  constructor(
    public catergoryService: CatergoryService,
    public dialog: MatDialog,
    public router: Router,
    private locationService: LocationService
  ) {}

  openNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit(): void {
    this.catergoryService.getCurrentCategory().subscribe((res: Category) => {
      this.currentCategory = res;
    });
    this.locationService.getCurrentLocation().subscribe((res: MyLocation) => {
      this.currentLocation = res;
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: "250px",
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("The dialog was closed");
      this.categoryName = result;
      console.log(this.categoryName);
    });
  }

  openAddLocationDialog(): void {
    const dialogRef = this.dialog.open(AddLocationComponent, {
      width: "250px",
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("The dialog was closed");
      this.LocationName = result;
      console.log(this.LocationName);
    });
  }

  openViewDetailsCategoryDialog(): void {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      width: "250px",
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("The dialog was closed");
    });
  }

  openViewDetailsLocationDialog(): void {
    const dialogRef = this.dialog.open(ViewLocationComponent, {
      width: "280px",
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("The dialog was closed");
    });
  }

  openUpdateCategoryDialog(): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      width: "300px",
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("The dialog was closed");
    });
  }

  openUpdateLocationDialog(): void {
    const dialogRef = this.dialog.open(UpdateLocationComponent, {
      width: "300px",
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("The dialog was closed");
    });
  }

  deleteCategory() {
    this.catergoryService.deleteCategory(
      this.catergoryService.getCurrentCategory().getValue()
    );
  }

  deleteLocation() {
    this.locationService.deleteLocation(
      this.locationService.getCurrentLocation().getValue()
    );
  }
}
