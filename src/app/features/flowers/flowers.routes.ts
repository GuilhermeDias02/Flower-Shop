import { Routes } from '@angular/router';
import { FlowersHomePageComponent } from './components/flowersHomePage.component';
import { FlowerShopComponent } from './components/flowerShop.component';
import { authGuard } from '../../core/guards/auth.guard';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    component: FlowersHomePageComponent,
  },
  {
    path: 'shop',
    canActivate: [authGuard],
    component: FlowerShopComponent,
  },
];
