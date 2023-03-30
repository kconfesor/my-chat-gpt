import {Component, Input} from '@angular/core';
import {ChatCompletionRequestMessage} from "openai";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {
  @Input() message: ChatCompletionRequestMessage | undefined;

}
