import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MyLocation } from "../../models/interfaces";
import { CatergoryService } from "../category/catergory.service";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  locationList$: BehaviorSubject<MyLocation[]> = new BehaviorSubject<
    MyLocation[]
  >(null);

  chooseLocation$: BehaviorSubject<MyLocation> =
    new BehaviorSubject<MyLocation>(null);

  constructor() {
    if (!localStorage.getItem("locations")) {
      this.locationList$.next([
        {
          name: "Tel-Aviv",
          address: "Even Grvirol 22",
          coordinates: "112233",
          category: { name: "Food" },
        },
        {
          name: "London",
          address: "Queen Elizabet",
          coordinates: "223344",
          category: { name: "Museums" },
        },
        {
          name: "Amsterdam",
          address: "Dam Squere",
          coordinates: "334455",
          category: { name: "Bars" },
        },
        {
          name: "New York",
          address: "Times Squere",
          coordinates: "445566",
          category: { name: "Bars" },
        },
      ]);
      localStorage.setItem(
        "locations",
        JSON.stringify(this.locationList$.getValue())
      );
    }
  }

  // Location List
  // Get the current locations list
  getLocationList() {
    if (!this.locationList$.getValue() && localStorage.getItem("locations")) {
      this.locationList$.next(JSON.parse(localStorage.getItem("locations")));
    }
    return this.locationList$;
  }

  // Choose location
  newSelection(location: MyLocation) {
    this.chooseLocation$.next(location);
    localStorage.setItem("currentLocation", JSON.stringify(location));
  }

  // Add new location
  addLocation(location: MyLocation) {
    const updateList = this.locationList$.getValue();

    updateList.push(location);
    this.updateList(updateList);
  }

  // Update the list
  updateList(locationlist: MyLocation[]) {
    this.locationList$.next(locationlist);
    localStorage.setItem("locations", JSON.stringify(locationlist));

    localStorage.removeItem("currentLocation");
    this.chooseLocation$.next(null);
  }

  // Delete location
  deleteLocation(location: MyLocation) {
    const updateList = this.locationList$
      .getValue()
      .filter((c) => c !== location);
    this.updateList(updateList);
  }

  // Update location
  updateLocation(location: MyLocation) {
    const updateList = this.locationList$.getValue();

    const updateLocationIndex = this.locationList$
      .getValue()
      .findIndex(
        (loc: MyLocation) => loc.name == this.chooseLocation$.getValue().name
      );
    updateList[updateLocationIndex] = location;
    this.updateList(updateList);
  }

  getCurrentLocation() {
    if (
      !this.chooseLocation$.getValue() &&
      localStorage.getItem("currentLocation")
    ) {
      this.chooseLocation$.next(
        JSON.parse(localStorage.getItem("currentLocation"))
      );
    }

    return this.chooseLocation$;
  }
}
