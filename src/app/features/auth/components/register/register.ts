import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { HeaderComponent } from '../../../../shared/components/header/header.component';

// Validateur personnalisé pour la confirmation de mot de passe
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, HeaderComponent],
  template: `
    <app-header [pageTitle]="'Register'"></app-header>
    <div class="flex w-full items-center justify-center min-h-screen">
      <div class="w-full max-w-md bg-white rounded-2xl shadow-lg border-2 p-8">
        <h2 class="text-2xl font-bold text-center text-gray-800">Register</h2>
        <form (ngSubmit)="onRegister()" [formGroup]="registerForm" class="mt-6 space-y-4">
          <div>
            <label for="name" class="block text-gray-600">Name</label>
            <input
              formControlName="name"
              type="text"
              placeholder="Enter your full name"
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              [class.border-red-500]="isFieldInvalid('name')"
            />
            @if (isFieldInvalid('name')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('name') }}
              </p>
            }
          </div>
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
          <div>
            <label for="confirmPassword" class="block text-gray-600">Confirm Password</label>
            <input
              formControlName="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              class="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              [class.border-red-500]="isFieldInvalid('confirmPassword')"
            />
            @if (isFieldInvalid('confirmPassword')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('confirmPassword') }}
              </p>
            }
          </div>
          <button
            type="submit"
            [disabled]="registerForm.invalid || loading()"
            class="w-full py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
          >
            @if (loading()) {
              <span
                class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
              ></span>
              Creating account...
            } @else {
              Register
            }
          </button>

          @if (error()) {
            <div class="bg-red-50 border border-red-200 rounded-md p-4">
              <p class="text-sm text-red-600">{{ error() }}</p>
            </div>
          }
        </form>
        <p class="mt-4 text-sm text-center text-gray-600">
          Already have an account?
          <a routerLink="/auth/login" class="text-indigo-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  loading = signal(false);
  error = signal<string>('');

  constructor() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator },
    );
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.loading.set(true);
      this.error.set('');

      const { ...userData } = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (user: User) => {
          this.loading.set(false);
          this.authService.setCurrentUser(user);
          this.router.navigate(['/flowers/shop']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message || 'Error during the account creation');
        },
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Required field';
      if (field.errors['email']) return 'Wrong email format';
      if (field.errors['minlength'])
        return `Minimum ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['passwordMismatch']) return 'Passwords must correspond';
    }
    return '';
  }
}
