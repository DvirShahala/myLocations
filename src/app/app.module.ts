import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./material-module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { AddCategoryComponent } from "./components/add-category/add-category.component";
import { ViewDetailsComponent } from "./components/view-details/view-details.component";
import { UpdateCategoryComponent } from "./components/update-category/update-category.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BottomNavComponent } from "./components/bottom-nav/bottom-nav.component";
import { LocationsComponent } from "./components/locations/locations.component";
import { AddLocationComponent } from "./components/add-location/add-location.component";
import { ViewLocationComponent } from "./components/view-location/view-location.component";
import { UpdateLocationComponent } from "./components/update-location/update-location.component";
import { MapsComponent } from './components/maps/maps.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CategoriesComponent,
    AddCategoryComponent,
    ViewDetailsComponent,
    UpdateCategoryComponent,
    BottomNavComponent,
    LocationsComponent,
    AddLocationComponent,
    ViewLocationComponent,
    UpdateLocationComponent,
    MapsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
