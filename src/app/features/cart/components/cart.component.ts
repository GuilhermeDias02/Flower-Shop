import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AuthService } from '../../auth/services/auth.service';
import { CartService } from '../services/cart.service';
import { FlowerService } from '../../flowers/services/flowers.service';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent],
  template: `
    <app-header [pageTitle]="'Cart'" [homeLink]="'/shop'"></app-header>
    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-auto">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Your Cart</h2>

      <div class="space-y-4">
        @if (userCart()) {
          @for (item of cartItems(); track item.flower?.id) {
            <div class="flex justify-between items-center border-b pb-2">
              <!-- Flower Name -->
              <span class="text-gray-700 font-medium">{{ item.flower?.name }}</span>

              <!-- Quantity Controls -->
              <div class="flex items-center gap-2">
                <button
                  (click)="decrease(item.flower?.id)"
                  class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 rounded"
                >
                  –
                </button>
                <span class="w-6 text-center font-semibold">{{ item.quantity }}</span>
                <button
                  (click)="increase(item.flower?.id)"
                  class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 rounded"
                >
                  +
                </button>
              </div>
            </div>
          }
        } @else {
          <p class="text-gray-500">Your cart is empty 🌸</p>
        }

        <!-- Pay Button -->
        <div class="pt-4">
          <button
            (click)="onPay()"
            [disabled]="!userCart()"
            class="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-default disabled:hover:bg-green-500"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class CartComponent {
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private flowerService = inject(FlowerService);
  userCart = signal<Cart | null>(this.cartService.getUserCart(this.authService.currentUser$()?.id));

  flowerName(flowerId: number): string {
    return this.flowerService.getFlowerNameById(flowerId);
  }

  cartItems() {
    if (this.userCart()) {
      return Array.from(this.userCart()?.flowers.entries() ?? []).map(([flowerId, quantity]) => {
        const flower = this.flowerService.getFlowerById(flowerId);
        return { flower, quantity };
      });
    }
    return [];
  }

  increase(flowerId?: number): void {
    if (this.userCart() && flowerId) {
      const current = this.userCart()?.flowers.get(flowerId) ?? 0;
      this.userCart()?.flowers.set(flowerId, current + 1);
    } else {
      console.warn('Tried increasing element with an empty cart');
    }
  }

  decrease(flowerId?: number) {
    if (this.userCart() && flowerId) {
      const current = this.userCart()?.flowers.get(flowerId) ?? 0;
      if (current > 1) {
        this.userCart()?.flowers.set(flowerId, current - 1);
      } else {
        this.userCart()?.flowers.delete(flowerId);
      }
    } else {
      console.warn('Tried decreasing element with an empty cart');
    }
  }

  onPay(): void {
    //todo: payement
    //navigate payment
  }
}
