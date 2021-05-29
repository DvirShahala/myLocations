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
  selector: "app-add-location",
  templateUrl: "./add-location.component.html",
  styleUrls: ["./add-location.component.scss"],
})
export class AddLocationComponent implements OnInit {
  formGroup: FormGroup;
  categories: Category[];

  constructor(
    public dialogRef: MatDialogRef<AddLocationComponent>,
    public formBuilder: FormBuilder,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.categories = JSON.parse(localStorage.getItem("categories"));
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      // coordinates: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      category: [null, [Validators.required]],
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

  addLocation(newCLocation: updateLocation) {
    const newLocation: MyLocation = {
      name: newCLocation.name,
      address: newCLocation.address,
      coordinates: {
        latitude: Number(newCLocation.latitude),
        longitude: Number(newCLocation.longitude),
      },
      category: { name: newCLocation.category },
    };
    this.locationService.addLocation(newLocation);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
