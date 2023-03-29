import { Component } from '@angular/core';
import {OpenaiService} from "../services/openai.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {
  loading$ = this.openAiService.loading$;
  message = new FormControl('');

  constructor(private openAiService: OpenaiService) {

  }

  async onSendMessage() {
    await this.openAiService.sendMessage(this.message.value ?? '');
    this.message.setValue('');
  }
}
