import { Routes } from '@angular/router';
import { AdminComponent } from './components/admin.component';
import { adminGuard } from '../../core/guards/admin.guard';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    canActivate: [adminGuard],
    component: AdminComponent,
  },
];
