import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Category } from "../../models/interfaces";
import { find } from "rxjs/operators";
import { LocationService } from "../location/location.service";

@Injectable({
  providedIn: "root",
})
export class CatergoryService {
  categoriesList$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >(null);

  chooseCategory$: BehaviorSubject<Category> = new BehaviorSubject<Category>(
    null
  );

  constructor(private locationService: LocationService) {
    if (!localStorage.getItem("categories")) {
      this.categoriesList$.next([
        { name: "Food" },
        { name: "Museums" },
        { name: "Bars" },
        { name: "Clinic" },
        { name: "Park" },
      ]);
      localStorage.setItem(
        "categories",
        JSON.stringify(this.categoriesList$.getValue())
      );
    }
  }

  // Category List
  // Get the current categories list
  getCategoryList() {
    if (
      !this.categoriesList$.getValue() &&
      localStorage.getItem("categories")
    ) {
      this.categoriesList$.next(JSON.parse(localStorage.getItem("categories")));
    }

    return this.categoriesList$;
  }

  // Delete category
  deleteCategory(category: Category) {
    const updateList = this.categoriesList$
      .getValue()
      .filter((c) => c !== category);
    this.updateList(updateList);
    // Delete the category from the locations
    this.locationService.deleteCategoryInLocation(category);
  }

  // Update category
  updateCategory(category: Category) {
    const updateList = this.categoriesList$.getValue();

    const updateCategoryIndex = this.categoriesList$
      .getValue()
      .findIndex(
        (categ: Category) => categ.name == this.chooseCategory$.getValue().name
      );
    updateList[updateCategoryIndex] = category;
    this.updateList(updateList);
  }

  // Add new category
  addCategory(category: Category) {
    const updateList = this.categoriesList$.getValue();

    updateList.push(category);
    this.updateList(updateList);
  }

  // Update the list
  updateList(categoriesList: Category[]) {
    this.categoriesList$.next(categoriesList);
    localStorage.setItem("categories", JSON.stringify(categoriesList));

    localStorage.removeItem("currentCategory");
    this.chooseCategory$.next(null);
  }

  // Choose Category
  newSelection(category: Category) {
    this.chooseCategory$.next(category);
    localStorage.setItem("currentCategory", JSON.stringify(category));
  }

  getCurrentCategory() {
    if (
      !this.chooseCategory$.getValue() &&
      localStorage.getItem("currentCategory")
    ) {
      this.chooseCategory$.next(
        JSON.parse(localStorage.getItem("currentCategory"))
      );
    }

    return this.chooseCategory$;
  }
}
