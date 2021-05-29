import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Category, MyLocation } from "src/app/models/interfaces";
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
      coordinates: [null, [Validators.required]],
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

  addLocation(newCLocation: MyLocation) {
    newCLocation.category = { name: JSON.stringify(newCLocation.category) };
    this.locationService.addLocation(newCLocation);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
