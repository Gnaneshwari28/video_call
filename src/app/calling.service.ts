import { Injectable, computed, signal } from '@angular/core';
import { Call, StreamVideoClient, User} from '@stream-io/video-client';

@Injectable({
  providedIn: 'root'
})
export class CallingService {
  [x: string]: any;

  callId = signal<String | undefined>(undefined);
  activeChannel = signal<any | undefined>(undefined);

  call = computed<Call | undefined>(() =>{

    const currentCallId :any = this.callId();
    if(currentCallId != undefined){
      const call = this.client.call('default',currentCallId);
      call.join({ create:true }).then(async () =>{
        call.camera.enable();
        call.microphone.enable();
      });
      return call;
    }else{
      return undefined;
    }

  });

  client : StreamVideoClient;

  constructor() { 

    const apiKey = '5cs7r9gv7sny';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoib2RkLWJhci03IiwiZXhwIjoxNzI1MjEwNDkxfQ.PxC4ovaWyb-aKDiNhVHCBeGqGqgnlmkca_mUJoe2rUo'; // same as in app component
    const user : User = {id:'floral-meadow-5'};
    this.client = new StreamVideoClient({apiKey,token,user});
  }

  setActiveChannel(channel: any) { // Accepting any type for the channel
    this.activeChannel.set({id:channel.id});
  }

   setCallId(callId:string|undefined){
           if(callId == undefined){
            this.call()?.leave();
           }
           this.callId.set(callId);
   }

}
