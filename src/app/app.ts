import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <!-- <app-header /> -->
    <main class="container mx-auto p-4">
      <!-- <app-pwa-prompt> </app-pwa-prompt> -->
      <router-outlet />
    </main>
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('flower-shop');
}
