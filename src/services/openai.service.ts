import { Injectable } from '@angular/core';
import {Store} from "tauri-plugin-store-api";
import {BehaviorSubject} from "rxjs";
import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from "openai";

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private OPEN_AI_KEY = "openai_api_key";
  private CONVERSATION = "conversations";
  private openAiApi: OpenAIApi | undefined;

  private messages = new BehaviorSubject<ChatCompletionRequestMessage[]>([]);
  private loading = new BehaviorSubject<boolean>(false);
  public messages$ = this.messages.asObservable();
  public loading$ = this.loading.asObservable();

  constructor(private store: Store) {
    this.loadConversation().then(() => console.log('loaded conversation'));
  }

  async loadConversation() {
    const messages = await this.store.get(this.CONVERSATION) as ChatCompletionRequestMessage[] ?? [];
    this.messages.next(messages);
    this.loading.next(false);
  }

  async setApiKey(apiKey: string) {
    await this.store.set(this.OPEN_AI_KEY, apiKey);
  }

  private async init() {
    if (!this.openAiApi) {
      const apiKey = await this.store.get(this.OPEN_AI_KEY) as string;
      const configuration = new Configuration({
        apiKey: apiKey
      });

      this.openAiApi = new OpenAIApi(configuration);
    }
  }

  async sendMessage(message: string){
    if (!message) {
        return;
    }
    this.loading.next(true);
    await this.init();
    const messages = [...this.messages.value];
    messages.push({role: "user", content: message});

    const completion = await this.openAiApi?.createChatCompletion({
      model: "gpt-3.5-turbo", //fixed for now
      messages: messages,
    });

    if (completion?.status !== 200) {
      console.error(completion?.statusText);
      return;
    }

    if (completion.data.choices.length > 0) {
      const choice = completion?.data.choices[0];

      if (choice?.message) {
        messages.push(choice.message);
        this.messages.next(messages);
      }
    }

    await this.store.set(this.CONVERSATION, messages);
    await this.store.save();
    this.loading.next(false);
  }
}
