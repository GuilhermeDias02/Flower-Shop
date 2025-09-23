export interface Cart {
  flowers: Map<number, number>; // flowerId -> quantity
  userId: number;
}
