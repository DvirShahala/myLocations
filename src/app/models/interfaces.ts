export interface Category {
  name: string;
}

export interface Location {
  name: string;
  adress: string;
  coordinates: string;
  category: Category;
}
