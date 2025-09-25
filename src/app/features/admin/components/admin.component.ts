import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { AuthService } from '../../auth/services/auth';
import { User } from '../../auth/models/user.model';
// import { firstValueFrom } from 'rxjs';
import { AddFlowerDTO, Flower } from '../../flowers/models/flowers.model';
import { AuthService } from '../../auth/services/auth.service';
import { FlowerService } from '../../flowers/services/flowers.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { AutoFocusDirective } from '../../../shared/directives/autoFocus.directive';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, AutoFocusDirective],
  template: `
    <app-header [pageTitle]="'Admin menu'"></app-header>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
      <div class="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 class="text-2xl font-bold text-indigo-700 mb-6">Create New Flower</h2>

        <form [formGroup]="flowerForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Name -->
          <div>
            <label for="name" class="block text-gray-700 mb-1">Name</label>
            <input
              formControlName="name"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Rose"
              appAutoFocus
            />
            @if (flowerForm.controls.name.invalid && flowerForm.controls.name.touched) {
              <p class="text-red-500 text-sm mt-1">Name is required</p>
            }
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-gray-700 mb-1">Description</label>
            <textarea
              formControlName="description"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="A beautiful red rose"
            ></textarea>
            @if (
              flowerForm.controls.description.invalid && flowerForm.controls.description.touched
            ) {
              <p class="text-red-500 text-sm mt-1">Description is required</p>
            }
          </div>

          <!-- Origin -->
          <div>
            <label for="origin" class="block text-gray-700 mb-1">Origin</label>
            <input
              formControlName="origin"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Netherlands"
            />
            @if (flowerForm.controls.origin.invalid && flowerForm.controls.origin.touched) {
              <p class="text-red-500 text-sm mt-1">Origin is required</p>
            }
          </div>

          <!-- Price -->
          <div>
            <label for="price" class="block text-gray-700 mb-1">Price (EUR)</label>
            <input
              formControlName="price"
              type="number"
              step="0.01"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="10.00"
            />
            @if (flowerForm.controls.price.invalid && flowerForm.controls.price.touched) {
              <p class="text-red-500 text-sm mt-1">Price must be greater than 0</p>
            }
          </div>

          <div class="flex justify-between items-center">
            <label for="bouquet" class="text-gray-700 mr-2">Bouquet</label>
            <input
              formControlName="bouquet"
              type="checkbox"
              id="bouquet"
              class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
          </div>

          <!-- Image file -->
          <!-- <div>
            <label for="imageFile" class="block text-gray-700 mb-1">Image File</label>
            <input
              formControlName="imageFile"
              type="file"
              class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div> -->

          <!-- Submit -->
          <div>
            <button
              type="submit"
              [disabled]="flowerForm.invalid"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-default"
            >
              Create Flower
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private flowerService = inject(FlowerService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  activeTab = signal<'users' | 'tickets'>('users');
  users = signal<User[]>([]);
  flowersa = signal<Flower[]>([]);

  flowerForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    origin: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    bouquet: [false, [Validators.required]],
  });

  async ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/flowers']);
      return;
    }

    // Charger les données
    // await this.loadUsers();
    // await this.loadTodos();
  }

  onSubmit() {
    if (this.flowerForm.valid) {
      const raw = this.flowerForm.value;

      const newFlower: AddFlowerDTO = {
        name: raw.name ?? '',
        description: raw.description ?? '',
        origin: this.capitalize(raw.origin ?? ''),
        price: raw.price ?? 0,
      } as AddFlowerDTO;

      this.flowerService.addFlower(newFlower);

      this.flowerForm.reset();
    }
  }

  //for the image file name
  private toSnakeCase(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, '_');
  }

  private capitalize(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
