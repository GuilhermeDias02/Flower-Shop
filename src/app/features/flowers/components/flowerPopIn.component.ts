import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Flower } from '../models/flowers.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-flower-popin',
  standalone: true,
  imports: [CommonModule],
  template: 'FlowerPopIn',
})
export class FlowerPopInComponent {
  private authService = inject(AuthService);
  selectFlower = input<Flower>();
  connected = this.authService.getCurrentUser() ? true : false;
}
