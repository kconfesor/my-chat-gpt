import { Component } from '@angular/core';
import {OpenaiService} from "../services/openai.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {
  loading$ = this.openaiService.loading$;
  message = new FormControl('');

  constructor(private openaiService: OpenaiService) {

  }

  async onSendMessage() {
    await this.openaiService.sendMessage(this.message.value ?? '');
    this.message.setValue('');
  }
}
