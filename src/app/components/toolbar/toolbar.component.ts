import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { Category } from "src/app/models/interfaces";
import { CatergoryService } from "src/app/services/catergory.service";
import { AddCategoryComponent } from "../add-category/add-category.component";
import { UpdateCategoryComponent } from "../update-category/update-category.component";
import { ViewDetailsComponent } from "../view-details/view-details.component";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
  styleUrls: ["./toolbar.component.scss"],
})
export class ToolbarComponent implements OnInit {
  currentCategory: Category;
  categoryName: string;
  navbarOpen: boolean = false;

  constructor(
    public catergoryService: CatergoryService,
    public dialog: MatDialog
  ) {}

  openNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  ngOnInit(): void {
    this.catergoryService.getCurrentCategory().subscribe((res: Category) => {
      // console.log(res);
      // console.log(this.currentCategoryName);
      this.currentCategory = res;
      ///console.log(this.currentCategoryName);
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

  openViewDetailsDialog(): void {
    const dialogRef = this.dialog.open(ViewDetailsComponent, {
      width: "250px",
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log("The dialog was closed");
    });
  }

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
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
}
