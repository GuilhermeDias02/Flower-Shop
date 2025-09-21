import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <app-header [pageTitle]="'Shop'"></app-header>
    FlowerShop
  `,
})
export class FlowerShopComponent {}
