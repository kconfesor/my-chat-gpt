import {inject, Inject, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConversationComponent} from "./conversation/conversation.component";
import {HomeComponent} from "./home/home.component";
import {OpenaiService} from "./core/openai.service";


export const hasKey = async () => {
  const service = inject(OpenaiService);
  return await service.hasApiKey();
}

const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: 'conversations', component: ConversationComponent,
        canActivate: [async () => await hasKey()]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
