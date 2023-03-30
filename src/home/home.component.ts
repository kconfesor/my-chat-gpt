import {Component, OnInit} from '@angular/core';
import {OpenaiService} from "../core/openai.service";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  apiKey = new FormControl('', Validators.required);
  constructor(private openaiService: OpenaiService, private router: Router){
  }

  async ngOnInit() {
    const hasKey = await this.openaiService.hasApiKey();
    if (hasKey) {
      await this.router.navigate(['/conversations']);
    }
  }

  async onSaveApiKey(){
    const key = this.apiKey.value;
    if (!key) {
      return;
    }

    await this.openaiService.setApiKey(key);
    await this.router.navigate(['/conversations']);
  }
}
