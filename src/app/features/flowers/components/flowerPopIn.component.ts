import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flower } from '../models/flowers.model';
import { AuthService } from '../../auth/services/auth.service';
import { FlowerService } from '../services/flowers.service';

@Component({
  selector: 'app-flower-popin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        class="bg-white rounded-xl shadow-xl w-11/12 md:w-2/3 lg:w-1/3 max-h-[90vh] overflow-auto relative p-6"
      >
        <!-- Close Button -->
        <button
          (click)="onClose()"
          class="absolute top-1 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        <!-- Flower Image -->
        <div class="p-4">
          <img
            [src]="imagePath(selectedFlower()!)"
            [alt]="selectedFlower()?.name"
            class="w-full h-64 object-cover rounded-lg mb-4"
          />

          <!-- Flower Name -->
          <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ selectedFlower()?.name }}</h2>

          <!-- Description -->
          <p class="text-gray-700 mb-2">{{ selectedFlower()?.description }}</p>

          <!-- Origin -->
          <p class="text-gray-500 mb-4"><strong>Origin:</strong> {{ selectedFlower()?.origin }}</p>

          <p class="text-gray-700 mb-2">{{ selectedFlower()?.price }}€</p>

          <!-- Buy Button -->
          <button
            (click)="onBuy()"
            class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  `,
})
export class FlowerPopInComponent {
  private authService = inject(AuthService);
  //   private cartService = inject(CartService);//todo: create CartService
  private flowerService = inject(FlowerService);
  selectedFlower = input<Flower | null>();
  //   onCloseFunction = input<void>();
  @Output() closeFunction = new EventEmitter<void>();
  connected = this.authService.getCurrentUser() ? true : false;

  //todo: implement onBuy from cartService
  onBuy(): void {
    //this.cartService.addToCart(selectedFlower);
  }

  imagePath(flower?: Flower): string {
    return this.flowerService.getFlowerImagePath(flower);
  }

  onClose(): void {
    this.closeFunction.emit();
  }
}
