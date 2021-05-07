import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/interfaces';
import { CatergoryService } from 'src/app/services/catergory.service';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent implements OnInit {
  currCategory: Category;
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    private formBuilder: FormBuilder,
    public catergoryService: CatergoryService
  ) {}

  ngOnInit(): void {
    this.currCategory = JSON.parse(localStorage.getItem('currentCategory'));
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      "name": [this.currCategory.name, [Validators.required]],
    });
  }

  getErrorCatName() {
    return this.formGroup.get('name').hasError('required')
      ? 'Category name is required'
      : '';
  }

  updateCategory(updatedCategory: Category) {
    this.catergoryService.updateCategory(updatedCategory);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
