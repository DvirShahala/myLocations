import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
} from "@angular/core";
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
    const marker = L.marker([this.latitude, this.longitude]).addTo(this.map);

    tiles.addTo(this.map);
  }

  ngOnChanges() {
    if (this.map) {
      this.map.remove();
    }
    this.initMap();
  }
}
