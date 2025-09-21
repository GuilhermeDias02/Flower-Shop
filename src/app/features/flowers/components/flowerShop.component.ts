import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Flower } from '../models/flowers.model';
import { FlowerCardComponent } from './flowerCard.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FlowerCardComponent],
  template: `
    <app-header [pageTitle]="'Shop'"></app-header>
    FlowerShop
    <app-flower-card
      [flower]="this.flower"
      [displayDetailsFunction]="showDetails()"
    ></app-flower-card>
  `,
})
export class FlowerShopComponent {
  flower: Flower = {
    id: 1,
    name: 'red',
    description: 'description',
    price: 11.25,
    origin: 'France',
    bouquet: false,
  };

  showDetails(): void {
    console.log('show details');
  }
}
