import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mx-auto p-2 text-white pb-100">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'my-chat-gpt';
}
