import { Injectable } from '@angular/core';
import { Flower } from '../models/flowers.model';

@Injectable({
  providedIn: 'root',
})
export class FlowerService {
  // mock data
  private flowers: Flower[] = [
    {
      id: 1,
      name: 'red',
      description: 'description',
      price: 11.25,
      origin: 'France',
      bouquet: false,
    },
  ];

  getAllFlowers(): Flower[] {
    return this.flowers;
  }

  getFlowerImagePath(flower?: Flower): string {
    if (flower) {
      return 'assets/images/' + flower?.name + (flower.bouquet ? '_bouquet' : '') + '.webp';
    }

    return '';
  }
}
