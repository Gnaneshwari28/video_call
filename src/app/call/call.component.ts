import { Component, ElementRef, EventEmitter, Input, Output, Signal, ViewChild } from '@angular/core';
import { CallingService } from '../calling.service';
import { CommonModule } from '@angular/common';
import { Call, StreamVideoParticipant } from '@stream-io/video-client';
import { ParticipantsComponent } from '../participants/participants.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { WebcamModule } from 'ngx-webcam';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [ParticipantsComponent,
    CommonModule,
    WebcamModule
  ],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss'
})
export class CallComponent {
  @Input({ required: true }) call!: Call;
  isCameraOn: boolean = false;
  isMicOn: boolean = false;
  isCamOn: boolean = false;

  participants: Signal<StreamVideoParticipant[]>;

  constructor(private callingService: CallingService) {
    this.participants = toSignal(
      this.callingService.call()!.state.participants$,
      // All @stream-io/video-client state Observables have an initial value, so it's safe to set the `requireSync` option: https://angular.io/guide/rxjs-interop#the-requiresync-option
      { requireSync: true }
    );
  }

  toggleMicrophone() {
    this.isMicOn = !this.isMicOn;
    this.call.microphone.toggle();
  }

  toggleCamera() {
    this.call.camera.toggle();
    this.isCameraOn = !this.isCameraOn;
    this.isCamOn = !this.isCamOn;
  }

  trackBySessionId(_: number, participant: StreamVideoParticipant) {
    return participant.sessionId;
  }

  leaveCall() {
    this.callingService.setCallId(undefined);
   }

   }
