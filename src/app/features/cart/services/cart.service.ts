import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //todo: sync carts to localStorage
  private carts: Cart[] = [
    {
      flowers: new Map([
        [1, 5],
        [2, 1],
      ]),
      userId: 3,
    },
    {
      flowers: new Map([[2, 10]]),
      userId: 1,
    },
  ];

  //Returns the current user's cart or false if it's empty
  getUserCart(userId?: number): Cart | null {
    if (!userId) throw Error('A user id must be provided');

    const userCart = this.carts.find((c: Cart) => c.userId === userId);
    if (userCart) {
      return userCart;
    }

    return null;
  }

  addToCart(userId?: number, flowerId?: number): void {
    if (userId && flowerId) {
      const cart = this.carts.find((c) => c.userId === userId);
      if (cart?.flowers.has(flowerId)) {
        const flowerNumber = cart?.flowers.get(flowerId);
        cart?.flowers.set(flowerId, (flowerNumber ?? 1) + 1);
      } else {
        cart?.flowers.set(flowerId, 1);
      }
    }
  }
}
