import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { Category } from "src/app/models/interfaces";
import { CatergoryService } from "src/app/services/category/catergory.service";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  categoryVal: Category;
  categoryList: Category[];

  constructor(private catergoryService: CatergoryService) {}

  ngOnInit(): void {
    this.catergoryService.getCategoryList().subscribe((res: Category[]) => {
      this.categoryList = res;
    });

    this.catergoryService.getCurrentCategory().subscribe((res: Category) => {
      this.categoryVal = res;
    });
  }

  onSelection(e, v) {
    this.catergoryService.newSelection(e.option.value);
  }
}
