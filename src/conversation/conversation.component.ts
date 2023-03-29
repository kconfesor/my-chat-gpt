import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {OpenaiService} from "../services/openai.service";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnDestroy{
  conversations$ = this.openaiService.messages$;
  errors$ = this.openaiService.error$;
  subscription = this.openaiService.loading$.subscribe(loading => {
    if (!loading) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  });

  constructor(private openaiService: OpenaiService) {

  }

  async onDeleteConversation() {
    await this.openaiService.clearConversation()
  }

  scrollToBottom(): void {
    const el = document.getElementById('message-input');
    el?.scrollIntoView({behavior: "smooth"});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
