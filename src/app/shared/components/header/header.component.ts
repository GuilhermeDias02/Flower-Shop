import { Component, ElementRef, HostListener, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header
      class="w-full bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 shadow-md relative"
    >
      <div class="flex items-center justify-between px-8 py-4 relative">
        <!-- Left: Logo -->
        <div class="text-2xl font-extrabold text-indigo-700 tracking-wide hover:cursor-pointer">
          <a [routerLink]="'/flowers' + this.homeLink()">🌸 Flower Shop</a>
        </div>

        <!-- Center: Page Title -->
        <div class="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div class="text-lg font-semibold text-gray-800">
            {{ pageTitle() }}
          </div>
        </div>

        <!-- Right -->
        <div class="relative flex items-center gap-6">
          <button
            type="button"
            (click)="onCartClick()"
            class="relative text-gray-700 hover:text-indigo-700 transition"
          >
            <!-- Cart Icon (Heroicons) -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-7 h-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.75 14.25h10.5l2.25-7.5H6.75m-1.644-3.978L6.75 14.25m0 0L5.25 18h13.5M9 21a.75.75 0 100-1.5.75.75 0 000 1.5zm6 0a.75.75 0 100-1.5.75.75 0 000 1.5z"
              />
            </svg>

            <!-- Example badge -->
            @if (cartCount > 0) {
              <span
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5"
              >
                {{ cartCount }}
              </span>
            }
          </button>
          <!-- If user is logged in -->
          <button (click)="toggleMenu()" class="focus:outline-none ">
            <img
              src="assets/avatar/defaultAvatar.webp"
              alt="Profile picture"
              class="w-10 h-10 rounded-full border-2 border-indigo-400 cursor-pointer hover:ring-2 hover:ring-indigo-300 transition"
            />
          </button>

          @if (showMenu) {
            <!-- Dropdown -->
            <div
              class="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-fadeIn z-50"
            >
              @if (currentUser()) {
                <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-pink-50">
                  <!-- <img [src]="user()?.avatar" alt="User" class="w-12 h-12 rounded-full border" /> -->
                  <div>
                    <p class="font-semibold text-gray-800">{{ currentUser()?.name }}</p>
                    <p class="text-sm text-gray-500">{{ currentUser()?.email }}</p>
                  </div>
                </div>
                <hr class="my-3" />
                <div class="p-4">
                  <button
                    type="button"
                    (click)="logout()"
                    class="block w-full text-left text-red-600 hover:underline cursor-pointer bg-transparent border-0 p-0"
                  >
                    Logout
                  </button>
                </div>
              } @else {
                <!-- If no user is logged in -->
                <div class="p-4">
                  <a
                    routerLink="/auth/login"
                    class="text-indigo-600 hover:underline cursor-pointer"
                  >
                    Login
                  </a>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private eRef = inject(ElementRef);
  private router = inject(Router);
  pageTitle = input<string>('Error loading page title');
  homeLink = input<string>('');
  cartCount = 2;

  currentUser = this.authService.currentUser$;

  constructor() {
    this.currentUser = this.authService.currentUser$;
  }

  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    if (this.showMenu && !this.eRef.nativeElement.contains(event.target)) {
      this.showMenu = false;
    }
  }

  onCartClick() {
    this.router.navigate(['/cart']);
  }
}
