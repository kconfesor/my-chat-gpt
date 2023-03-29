import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConversationComponent} from "./conversation/conversation.component";
import {Store} from "tauri-plugin-store-api";

const routes: Routes = [
  { path: '', component: ConversationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
