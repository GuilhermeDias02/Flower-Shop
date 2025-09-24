import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { User, LoginDTO, RegisterDTO } from '../models/user.model';
import bcrypt from 'bcryptjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  public currentUser$ = this.currentUser.asReadonly();
  private router = inject(Router);

  // Mock data - utilisateurs de test
  private users: User[] = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'mock',
      role: 'admin',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Normal User',
      email: 'user@example.com',
      password: 'mock',
      role: 'user',
      createdAt: new Date(),
    },
  ];

  private passwords: Record<string, string> = {
    'admin@example.com': '$2b$10$cmypnWK.owYQmFw3T5lPAOcwO0S8vnV/XZJWhJw65B0zIc0C4rK5G', //bcrypt salt 10
    'user@example.com': '$2b$10$Pu/QePkM.irhyGnqOEuH8uEdNon/p5zRUTPODzVKTkTTUcg1xgKOe',
  };

  constructor() {
    // Vérifier s'il y a un utilisateur en session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }

    if (this.loadUsersFromStorage()) console.warn('Users and passwords loaded from local storage');
  }

  login(credentials: LoginDTO): Observable<User> {
    const user = this.users.find((u) => u.email === credentials.email);
    const password = this.passwords[credentials.email];

    if (user && bcrypt.compareSync(credentials.password, password)) {
      // Simuler un délai réseau
      return of(user).pipe(delay(500));
    } else {
      return throwError(() => new Error('Incorrect email or password'));
    }
  }

  register(userData: RegisterDTO): Observable<User> {
    // Vérifier si l'email existe déjà
    const existingUser = this.users.find((u) => u.email === userData.email);
    if (existingUser) {
      return throwError(() => new Error('An account already uses this email'));
    }

    // Créer un nouvel utilisateur
    const newUser: User = {
      id: this.users.length + 1,
      name: userData.name,
      email: userData.email,
      password: 'mock',
      role: 'user',
      createdAt: new Date(),
    };

    // Ajouter aux mock data
    this.users.push(newUser);
    this.passwords[userData.email] = bcrypt.hashSync(userData.password, 10);

    this.saveUsersToStorage();

    // Simuler un délai réseau
    return of(newUser).pipe(delay(500));
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  getAllUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(300));
  }

  deleteUser(userId: number): Observable<void> {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.saveUsersToStorage();
      return of(void 0).pipe(delay(300));
    }
    return throwError(() => new Error('Utilisateur non trouvé'));
  }

  getToken(): string | null {
    const user = this.currentUser();
    return user ? `mock-token-${user.id}` : null;
  }

  // Méthode pour définir l'utilisateur connecté (utilisée après login)
  setCurrentUser(user: User): void {
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  /**
   * mock use only
   */
  private saveUsersToStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('passwords', JSON.stringify(this.passwords));
  }

  /**
   * mock use only
   *
   * @returns true if users and passwords where found in the local storage
   */
  private loadUsersFromStorage(): boolean {
    const storedUsers: string | null = localStorage.getItem('users');
    const storedPasswords: string | null = localStorage.getItem('passwords');

    if (storedUsers && storedPasswords) {
      this.users = JSON.parse(storedUsers) as User[];
      this.passwords = JSON.parse(storedPasswords) as Record<string, string>;
      return true;
    } else {
      this.saveUsersToStorage();
      return false;
    }
  }

  isAdmin(): boolean {
    return (
      this.currentUser$() !== undefined &&
      this.currentUser$() !== null &&
      this.currentUser$()?.role === 'admin'
    );
  }
}
