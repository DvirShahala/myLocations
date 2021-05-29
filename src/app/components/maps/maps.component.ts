import { Component, Input, OnChanges, OnInit } from "@angular/core";
import * as L from "leaflet";
import "mapbox-gl-leaflet";

@Component({
  selector: "app-maps",
  templateUrl: "./maps.component.html",
  styleUrls: ["./maps.component.scss"],
})
export class MapsComponent implements OnInit, OnChanges {
  private map;
  @Input() latitude: number;
  @Input() longitude: number;

  constructor() {}

  ngOnInit(): void {}

  private initMap(): void {
    // const cusIcon = L.icon({
    //   // iconUrl: "./marker-icon.png",
    //   iconUrl: "marker-icon.png",

    //   iconSize: [38, 100], // size of the icon
    //   shadowSize: [50, 64], // size of the shadow
    //   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    //   shadowAnchor: [4, 62], // the same for the shadow
    //   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    // });

    this.map = L.map("map", {
      center: [this.latitude, this.longitude],
      zoom: 10,
    });

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    // const marker = L.marker([this.latitude, this.longitude], {
    //   // icon: cusIcon,
    // }).addTo(this.map);
    L.circle([this.latitude, this.longitude], { radius: 3500 }).addTo(this.map);

    tiles.addTo(this.map);
  }

  ngOnChanges() {
    if (this.map) {
      this.map.remove();
    }
    this.initMap();
  }
}
