import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FlowerCardComponent } from './flowerCard.component';
import { Flower } from '../models/flowers.model';
import { FlowerService } from '../services/flowers.service';
import { FlowerPopInComponent } from './flowerPopIn.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FlowerCardComponent, FlowerPopInComponent],
  template: `
    <app-header [pageTitle]="'Home Page'"></app-header>
    <div class="flex flex-row flex-wrap ">
      @for (flower of flowers; track flower.id) {
        <app-flower-card [flower]="flower" (showDetails)="onShowDetails($event)"></app-flower-card>
      }
    </div>
    @if (showPopin()) {
      <app-flower-popin
        [selectedFlower]="this.selectedFlower()"
        [disableShop]="true"
        (closeFunction)="onClosePopin()"
      ></app-flower-popin>
    }
  `,
})
export class FlowersHomePageComponent {
  private flowerService = inject(FlowerService);
  flowers = this.flowerService.getAllFlowers();
  showPopin = signal(false);
  selectedFlower = signal<Flower | null>(null);
  cartCount = signal<number>(0);

  onShowDetails(flowerId: number): void {
    const foundFlower = this.flowers.find((f: Flower) => f.id === flowerId);
    if (foundFlower) {
      this.showPopin.set(true);
      this.selectedFlower.set(foundFlower);
    } else {
      console.warn(`Flower with id ${flowerId} not found`);
    }
  }

  onClosePopin(): void {
    this.showPopin.set(false);
    this.selectedFlower.set(null);
  }
}
