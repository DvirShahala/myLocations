export interface Category {
  name: string;
}

export interface MyLocation {
  name: string;
  address: string;
  coordinates: Coordinates;
  category: Category;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface updateLocation {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  category: string;
}
