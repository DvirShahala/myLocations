import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/interfaces';
import { find } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CatergoryService {
  categoriesList$: BehaviorSubject<Category[]> = new BehaviorSubject<
    Category[]
  >(null);

  chooseCategory$: BehaviorSubject<Category> = new BehaviorSubject<Category>(
    null
  );

  constructor() {
    if (!localStorage.getItem('categories')) {
      this.categoriesList$.next([
        { name: 'New York' },
        { name: 'Vegas' },
        { name: 'Rome' },
        { name: 'Pocket' },
        { name: 'Madrid' },
        { name: 'Berlin' },
      ]);
      localStorage.setItem(
        'categories',
        JSON.stringify(this.categoriesList$.getValue())
      );
    }
  }

  // Category List
  getCategoryList() {
    if (
      !this.categoriesList$.getValue() &&
      localStorage.getItem('categories')
    ) {
      this.categoriesList$.next(JSON.parse(localStorage.getItem('categories')));
    }

    return this.categoriesList$;
  }

  deleteCategory(category: Category) {
    const updateList = this.categoriesList$
      .getValue()
      .filter((c) => c !== category);
      this.updateList(updateList);
  }

  updateCategory(category: Category) {
    const updateList = this.categoriesList$.getValue();

    const updateCategoryIndex = this.categoriesList$
      .getValue()
      .findIndex((categ) => categ.name == this.chooseCategory$.getValue().name);
    updateList[updateCategoryIndex] = category;
    this.updateList(updateList);
  }

  addCategory(category: Category) {
    const updateList = this.categoriesList$.getValue();

    updateList.push(category);
    this.updateList(updateList);
  }

  updateList(categoriesList: Category[]) {
    this.categoriesList$.next(categoriesList);
    localStorage.setItem('categories', JSON.stringify(categoriesList));

    localStorage.removeItem('currentCategory');
    this.chooseCategory$.next(null);
  }

  // Choose Category
  newSelection(category: Category) {
    this.chooseCategory$.next(category);
    localStorage.setItem('currentCategory', JSON.stringify(category));
  }

  getCurrentCategory() {
    if (
      !this.chooseCategory$.getValue() &&
      localStorage.getItem('currentCategory')
    ) {
      this.chooseCategory$.next(
        JSON.parse(localStorage.getItem('currentCategory'))
      );
    }

    return this.chooseCategory$;
  }
}
