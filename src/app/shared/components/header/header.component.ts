import { Component, ElementRef, HostListener, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
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
        <div class="text-2xl font-extrabold text-indigo-700 tracking-wide">🌸 Flower Shop</div>

        <!-- Center: Page Title -->
        <div class="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div class="text-lg font-semibold text-gray-800">
            {{ pageTitle() }}
          </div>
        </div>

        <!-- Right -->
        <div class="relative flex items-cente">
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
  pageTitle = input<string>('Error loading page title');
  private eRef = inject(ElementRef);

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
}
