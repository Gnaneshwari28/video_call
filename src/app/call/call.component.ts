import { Component, Input, Signal } from '@angular/core';
import { ParticipantsComponent } from "../participants/participants.component";
import { CommonModule } from '@angular/common';
import { Call, StreamVideoParticipant } from '@stream-io/video-client';
import { CallingService } from '../calling.service';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-call',
  standalone: true,
  imports: [ParticipantsComponent,
    CommonModule
  ],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss'
})
export class CallComponent {

  @Input({ required:true }) call!: Call;

  participants: Signal<StreamVideoParticipant[]>;

  constructor(private callingService: CallingService){
    this.participants = toSignal(
      this.callingService.call()!.state.participants$,
      {requireSync: true}
    );
  }

  toggleMicrophone(){
    this.call.microphone.toggle();
  }
 
   toggleCamera(){
    this.call.camera.toggle();
   }


   trackSessionById(_:number,participant: StreamVideoParticipant){
    return participant.sessionId;
   }

   leaveCall(){
    this.callingService.setCallId(undefined);
   }

}
