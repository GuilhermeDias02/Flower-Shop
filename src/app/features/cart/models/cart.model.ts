export interface Cart {
  flowers: Map<number, number>; // flowerId -> quantity
  userId: number;
}

export interface CompatibleCart {
  flowers: [number, number][];
  userId: number;
}
