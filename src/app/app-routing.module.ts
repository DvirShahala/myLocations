import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CategoriesComponent } from "./components/categories/categories.component";
import { LocationsComponent } from "./components/locations/locations.component";

const routes: Routes = [
  //{ path: "", component: CategoriesComponent, pathMatch: "full" },
  { path: "", redirectTo: "/categories", pathMatch: "full" },
  { path: "categories", component: CategoriesComponent },
  { path: "locations", component: LocationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
