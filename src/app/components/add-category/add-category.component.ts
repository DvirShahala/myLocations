import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Category } from "src/app/models/interfaces";
import { CatergoryService } from "src/app/services/category/catergory.service";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.scss"],
})
export class AddCategoryComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCategoryComponent>,
    public formBuilder: FormBuilder,
    private catergoryService: CatergoryService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  getErrorCatName() {
    return this.formGroup.get("name").hasError("required")
      ? "Category name is required"
      : "";
  }

  addCategory(newCategory: Category) {
    this.catergoryService.addCategory(newCategory);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
