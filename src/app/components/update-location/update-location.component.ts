import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import {
  Category,
  MyLocation,
  updateLocation,
} from "src/app/models/interfaces";
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
      latitude: [this.currLocation.coordinates.latitude, [Validators.required]],
      longitude: [
        this.currLocation.coordinates.longitude,
        [Validators.required],
      ],
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

  getErrorCoordinatesLat() {
    return this.formGroup.get("latitude").hasError("required")
      ? "Coordinates latitude is required"
      : "";
  }

  getErrorCoordinatesLon() {
    return this.formGroup.get("longitude").hasError("required")
      ? "Coordinates longitude is required"
      : "";
  }

  updateLocation(updatedLocation: updateLocation) {
    const newLocation: MyLocation = {
      name: updatedLocation.name,
      address: updatedLocation.address,
      coordinates: {
        latitude: Number(updatedLocation.latitude),
        longitude: Number(updatedLocation.longitude),
      },
      category: { name: updatedLocation.category },
    };
    this.locationService.updateLocation(newLocation);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
