import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FlowerCardComponent } from './flowerCard.component';
import { Flower } from '../models/flowers.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FlowerCardComponent],
  template: `
    <app-header [pageTitle]="'Home Page'"></app-header
    ><!-- todo: home link = shop if connected -->
    FlowerHomePage
    <!-- <app-flower-card
      [flower]="this.flower"
      [displayDetailsFunction]="showDetails()"
    ></app-flower-card> -->
  `,
})
export class FlowersHomePageComponent {
  flower: Flower = {
    id: 1,
    name: 'red',
    description: 'description',
    price: 11.25,
    origin: 'France',
    bouquet: false,
  };

  showDetails(): void {
    // console.warn('show details');
  }
}
