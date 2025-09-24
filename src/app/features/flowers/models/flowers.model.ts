export interface Flower {
  id: number;
  name: string;
  description: string;
  price: number;
  origin: string;
  bouquet: boolean;
}

export interface AddFlowerDTO {
  name: string;
  description: string;
  price: number;
  origin: string;
  bouquet: boolean;
}
