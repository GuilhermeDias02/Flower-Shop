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
    {
      id: 2,
      name: 'rose',
      description:
        'Garden roses are predominantly hybrid roses that are grown as ornamental plants in private or public gardens. They are one of the most popular and widely cultivated groups of flowering plants, especially in temperate climates. An enormous number of garden cultivars has been produced, especially over the last two centuries, though roses have been known in the garden for millennia beforehand. While most garden roses are grown for their flowers, often in dedicated rose gardens, some are also valued for other reasons, such as having ornamental fruit, providing ground cover, or for hedging.',
      price: 35.23,
      origin: 'France',
      bouquet: true,
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

  getFlowerById(flowerId: number): Flower | null {
    const foundFlower = this.flowers.find((f) => f.id === flowerId);
    if (foundFlower) {
      return foundFlower;
    }
    return null;
  }

  getFlowerNameById(flowerId: number): string {
    const flower = this.getFlowerById(flowerId);
    if (flower) {
      return flower.name;
    }
    return 'error';
  }
}
