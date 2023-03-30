import {ChangeDetectionStrategy, Component, HostListener, OnDestroy} from '@angular/core';
import {OpenaiService} from "../core/openai.service";
import {Router} from "@angular/router";

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

  constructor(private openaiService: OpenaiService, private router: Router) {

  }

  async onDeleteConversation() {
    await this.openaiService.clearConversation()
  }

  async onChangeKey(){
    await this.openaiService.clearKey();
    await this.router.navigate(['/']);
  }

  scrollToBottom(): void {
    const el = document.getElementById('send-message-input');
    el?.scrollIntoView({behavior: "smooth"});
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' && !event.shiftKey) {
      console.log(event);
      //todo: go throw history
    }
  }
}
