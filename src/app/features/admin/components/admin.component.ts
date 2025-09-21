import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { AuthService } from '../../auth/services/auth';
import { User } from '../../auth/models/user.model';
// import { firstValueFrom } from 'rxjs';
import { Flower } from '../../flowers/models/flowers.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: '',
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  // private FlowerService = inject(FlowerService);
  private router = inject(Router);

  activeTab = signal<'users' | 'tickets'>('users');
  users = signal<User[]>([]);
  todos = signal<Flower[]>([]);

  async ngOnInit() {
    // Vérifier que l'utilisateur est admin
    // const currentUser = await this.authService.getCurrentUser();
    // if (!currentUser || currentUser.role !== 'admin') {
    //   this.router.navigate(['/todos']);
    //   return;
    // }

    // Charger les données
    await this.loadUsers();
    await this.loadTodos();
  }

  async loadUsers() {
    try {
      //   const users = await firstValueFrom(this.authService.getAllUsers());
      //   this.users.set(users);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  }

  async loadTodos() {
    try {
      //   const todos = await this.todoService.getAllTodos();
      //   this.todos.set(todos);
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error);
    }
  }

  async deleteUser(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await this.authService.deleteUser(userId);
        await this.loadUsers();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  }

  //    async deleteFlower(flowerId: number) {
  //      if (confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
  //        try {
  //            await this.todoService.deleteTodo(todoId);
  //            await this.loadTodos();
  //        } catch (error) {
  //          console.error('Erreur lors de la suppression:', error);
  //        }
  //      }
  //    }

  //   assignTodo(todo: Todo) {
  //     // TODO: Implémenter la logique d'assignation
  //     console.log('Assigner le ticket:', todo);
  //   }
}
