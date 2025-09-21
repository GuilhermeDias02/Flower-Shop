import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="flex items-center justify-center min-h-screen">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-lg border-2 p-8">
        <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form (ngSubmit)="onLogin()" [formGroup]="loginForm" class="mt-6 space-y-4">
          <div>
            <label for="email" class="block text-gray-600">Email</label>
            <input
              formControlName="email"
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              [class.border-red-500]="isFieldInvalid('email')"
            />
            @if (isFieldInvalid('email')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('email') }}
              </p>
            }
          </div>
          <div>
            <label for="password" class="block text-gray-600">Password</label>
            <input
              formControlName="password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              [class.border-red-500]="isFieldInvalid('password')"
            />
            @if (isFieldInvalid('password')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('password') }}
              </p>
            }
          </div>
          <button
            type="submit"
            [disabled]="loginForm.invalid || loading()"
            class="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            @if (loading()) {
              <span
                class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
              ></span>
              Connection...
            } @else {
              Login
            }
          </button>

          @if (error()) {
            <div class="bg-red-50 border border-red-200 rounded-md p-4">
              <p class="text-sm text-red-600">{{ error() }}</p>
            </div>
          }
        </form>
        <p class="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?
          <a routerLink="/auth/register" class="text-indigo-600 hover:underline cursor-pointer"
            >Register</a
          >
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  loading = signal(false);
  error = signal<string>('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.error.set('');

      this.authService.login(this.loginForm.value).subscribe({
        next: (user: User) => {
          this.loading.set(false);
          this.authService.setCurrentUser(user);
          this.router.navigate(['/flowers/shop']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message || 'Connection error');
        },
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Required field';
      if (field.errors['email']) return 'Invalid email format';
      if (field.errors['minlength'])
        return `Minimum ${field.errors['minlength'].requiredLength} characters`;
    }
    return '';
  }

  register(): void {
    this.router.navigate(['/auth/register']);
  }
}
