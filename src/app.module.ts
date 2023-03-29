import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversationComponent } from './conversation/conversation.component';
import { Store } from "tauri-plugin-store-api";
import { MessageComponent } from './message/message.component';
import { HomeComponent } from './home/home.component';
import {MarkdownModule} from "ngx-markdown";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ConversationComponent,
    MessageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [{provide: Store, useValue: new Store(".settings.dat")}],
  bootstrap: [AppComponent]
})
export class AppModule { }
