import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { CartComponent } from './components/cart.component';

export const CART_ROUTES: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: CartComponent,
  },
];
