import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flower } from '../models/flowers.model';

@Component({
  selector: 'app-flower-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-xs bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <!-- Flower Image -->
      <img
        [src]="'assets/images/' + flower()?.name + '.webp'"
        [alt]="flower()?.name"
        class="w-full h-48 object-cover"
      />

      <!-- Flower Name -->
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-800">{{ flower()?.name }}</h3>
      </div>

      <!-- Show Details Button -->
      <div class="p-4 pt-0">
        <button
          (click)="displayDetailsFunction()"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
        >
          Show Details
        </button>
      </div>
    </div>
  `,
})
export class FlowerCardComponent {
  flower = input<Flower>();
  displayDetailsFunction = input<void>();
}
