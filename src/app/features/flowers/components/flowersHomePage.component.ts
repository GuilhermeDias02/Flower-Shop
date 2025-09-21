import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <app-header [pageTitle]="'Home Page'"></app-header>
    FlowerHomePage
  `,
})
export class FlowersHomePageComponent {}
