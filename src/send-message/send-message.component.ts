import { Component } from '@angular/core';
import {OpenaiService} from "../core/openai.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html'
})
export class SendMessageComponent {
  loading$ = this.openaiService.loading$;
  message = new FormControl('');

  constructor(private openaiService: OpenaiService) {

  }

  async onSendMessage() {
    const message = this.message.value ?? '';
    this.message.setValue('');
    await this.openaiService.sendMessage(message);
  }
}
