import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MyLocation } from "src/app/models/interfaces";
import { LocationService } from "src/app/services/location/location.service";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl } from "@angular/forms";

export class Group {
  level = 0;
  expanded = false;
  totalCounts = 0;
}

@Component({
  selector: "app-locations",
  templateUrl: "./locations.component.html",
  styleUrls: ["./locations.component.scss"],
})
export class LocationsComponent implements OnInit, AfterViewInit {
  locationList: MyLocation[];
  locationVal: MyLocation;
  dataSource: MatTableDataSource<MyLocation>;
  displayedColumns: string[] = ["name", "address", "coordinates", "category"];
  @ViewChild(MatSort) sort: MatSort;

  groupByColumns: string[] = ["category"];
  expandedLocation: MyLocation[] = [];
  expandedSubLocation: MyLocation[] = [];
  _allGroup: any[];
  myLatitude: number;
  myLongitude: number;
  ifClick: boolean = false;
  preRow: MyLocation = null;

  categoryFilter = new FormControl();
  filteredValues = {
    name: "",
    address: "",
    coordinates: "",
    category: { name: "" },
  };

  constructor(public locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocationList().subscribe((res: MyLocation[]) => {
      this.locationList = res;
      this.dataSource = new MatTableDataSource(this.locationList);

      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === "category"
            ? currentTerm + data.category.name
            : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, "").toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
    });
    this.locationService.getCurrentLocation().subscribe((res: MyLocation) => {
      this.locationVal = res;
    });
    this.categoryFilter.valueChanges.subscribe((categoryFilterValue) => {
      this.dataSource.filter = categoryFilterValue;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  clickedRow(event, row: MyLocation) {
    // event.target.parentElement.classList.add("clickRow");
    if (this.preRow != row && this.ifClick) {
      this.locationService.newSelection(row);
      this.myLatitude = row.coordinates.latitude;
      this.myLongitude = row.coordinates.longitude;
    } else {
      this.ifClick = !this.ifClick;
      this.locationService.newSelection(row);
      this.myLatitude = row.coordinates.latitude;
      this.myLongitude = row.coordinates.longitude;
    }
    this.preRow = row;
    // event.target.parentElement.classList.remove("clickRow");
  }

  groupBy() {
    this.dataSource.data = this.getGroups(
      this.locationList,
      this.groupByColumns
    );
  }

  unGroupBy() {
    this.dataSource.data = this.locationList;
  }

  groupHeaderClick(row) {
    if (row.expanded) {
      row.expanded = false;
      this.dataSource.data = this.getGroups(
        this.locationList,
        this.groupByColumns
      );
    } else {
      row.expanded = true;
      this.expandedLocation = row;
      this.dataSource.data = this.addGroupsNew(
        this._allGroup,
        this.locationList,
        this.groupByColumns,
        row
      );
    }
  }

  addGroupsNew(
    allGroup: any[],
    data: any[],
    groupByColumns: string[],
    dataRow: any
  ): any[] {
    const rootGroup = new Group();
    rootGroup.expanded = true;
    return this.getSublevelNew(
      allGroup,
      data,
      0,
      groupByColumns,
      rootGroup,
      dataRow
    );
  }

  getSublevelNew(
    allGroup: any[],
    data: any[],
    level: number,
    groupByColumns: string[],
    parent: Group,
    dataRow: any
  ): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    const currentColumn = groupByColumns[level];
    let subGroups = [];
    allGroup.forEach((group) => {
      const rowsInGroup = data.filter(
        (row) => group[currentColumn].name === row[currentColumn].name
      );
      group.totalCounts = rowsInGroup.length;

      if (group.category.name == dataRow.category.name) {
        group.expanded = dataRow.expanded;
        const subGroup = this.getSublevelNew(
          allGroup,
          rowsInGroup,
          level + 1,
          groupByColumns,
          group,
          dataRow.category.name
        );
        this.expandedSubLocation = subGroup;
        subGroup.unshift(group);
        subGroups = subGroups.concat(subGroup);
      } else {
        subGroups = subGroups.concat(group);
      }
    });
    return subGroups;
  }

  getGroups(data: MyLocation[], groupByColumns: string[]): MyLocation[] {
    const rootGroup = new Group();
    rootGroup.expanded = false;
    return this.getGroupList(data, 0, groupByColumns, rootGroup);
  }

  getGroupList(
    data: MyLocation[],
    level: number = 0,
    groupByColumns: string[],
    parent: Group
  ): any[] {
    if (level >= groupByColumns.length) {
      return data;
    }
    let groups = this.uniqueBy(
      data.map((row) => {
        const result = new Group();
        result.level = level + 1;
        for (let i = 0; i <= level; i++) {
          result[groupByColumns[i]] = row[groupByColumns[i]];
        }
        return result;
      }),
      JSON.stringify
    );

    const currentColumn = groupByColumns[level];
    let subGroups = [];
    groups.forEach((group) => {
      const rowsInGroup = data.filter(
        (row) => group[currentColumn].name === row[currentColumn].name
      );
      group.totalCounts = rowsInGroup.length;
      this.expandedLocation = [];
    });
    groups = groups.sort((a: MyLocation, b: MyLocation) => {
      const isAsc = "asc";
      return this.compare(a.category.name, b.category.name, isAsc);
    });
    this._allGroup = groups;
    return groups;
  }

  uniqueBy(a, key) {
    const seen = {};
    return a.filter((item) => {
      const k = key(item);
      return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
  }

  isGroup(index, item): boolean {
    return item.level;
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
