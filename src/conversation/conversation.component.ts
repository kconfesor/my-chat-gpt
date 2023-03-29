import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OpenaiService} from "../services/openai.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent{
  conversations = this.openaiService.messages$;

  constructor(private openaiService: OpenaiService) {
    openaiService.loading$.subscribe(loading => {
      if (!loading) {
        setTimeout(() => this.scrollToBottom(), 100);
      }
    });
  }

  scrollToBottom(): void {
    const el = document.getElementById('message-input');
    el?.scrollIntoView({behavior: "smooth"});
  }
}
