import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Category, MyLocation } from "src/app/models/interfaces";
import { LocationService } from "src/app/services/location/location.service";

@Component({
  selector: "app-update-location",
  templateUrl: "./update-location.component.html",
  styleUrls: ["./update-location.component.scss"],
})
export class UpdateLocationComponent implements OnInit {
  currLocation: MyLocation;
  formGroup: FormGroup;
  categories: Category[];

  constructor(
    public dialogRef: MatDialogRef<UpdateLocationComponent>,
    public formBuilder: FormBuilder,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.currLocation = JSON.parse(localStorage.getItem("currentLocation"));
    this.categories = JSON.parse(localStorage.getItem("categories"));
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [this.currLocation.name, [Validators.required]],
      address: [this.currLocation.address, [Validators.required]],
      coordinates: [this.currLocation.coordinates, [Validators.required]],
      category: [this.currLocation.category.name, [Validators.required]],
    });
  }

  getErrorLocName() {
    return this.formGroup.get("name").hasError("required")
      ? "Location name is required"
      : "";
  }

  getErroraddress() {
    return this.formGroup.get("address").hasError("required")
      ? "Address is required"
      : "";
  }

  getErrorCoordinates() {
    return this.formGroup.get("coordinates").hasError("required")
      ? "Coordinates is required"
      : "";
  }

  // getErrorCatName() {
  //   return this.formGroup.get("category").hasError("required")
  //     ? "Category name is required"
  //     : "";
  // }

  updateLocation(updatedLocation: MyLocation) {
    updatedLocation.category = {
      name: JSON.stringify(updatedLocation.category),
    };
    this.locationService.updateLocation(updatedLocation);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
