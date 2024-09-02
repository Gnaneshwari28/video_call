import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  StreamChatModule,
  StreamAutocompleteTextareaModule,
  StreamI18nService,
  ChatClientService,
  ChannelService
} from 'stream-chat-angular'
import { CallComponent } from "./call/call.component";
import { CommonModule } from '@angular/common';
import { CallingService } from './calling.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule,
    StreamChatModule,
    StreamAutocompleteTextareaModule,
    CallComponent,
    CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
   callingService : CallingService
  constructor(
    private chatService : ChatClientService,
    private channelService : ChannelService,
    private streamI18nService : StreamI18nService,
    callingService : CallingService
  ){
    this.callingService = callingService;
    const apiKey = 'dz5f4d5kzrue';
    const userId = 'odd-bar-7';
    const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2RkLWJhci03IiwiZXhwIjoxNzI1MjEwNDkxfQ.PxC4ovaWyb-aKDiNhVHCBeGqGqgnlmkca_mUJoe2rUo';
    this.chatService.init(apiKey, userId, userToken);
    this.streamI18nService.setTranslation();

  }

  async ngOnInit() {
    const channel = this.chatService.chatClient.channel('messaging', 'talking-about-angular', {
      // add as many custom fields as you'd like
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png',
      name: 'Talking about Angular',
    });
    await channel.create();
    this.channelService.init({
      type: 'messaging',
      id: { $eq: 'talking-about-angular' },
    });
  }

  startCall(){
    const channelId = this.callingService.activeChannel()?.id;
    this.callingService.setCallId(channelId);
  }


}
