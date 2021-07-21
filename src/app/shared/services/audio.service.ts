import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  public canPlaySound = new BehaviorSubject<boolean>(false);
  public currentSound = '';
  public audio: any;
  private soundTitles = [
    `Billy's Sacrifice`,
    `Parabola`
  ];
  constructor() {}
  public async playSound(soundIndex: number): Promise<void> {
    this.audio = new Audio();
    const selectedSound = this.soundTitles[soundIndex];
    if (selectedSound === this.currentSound) {
      return;
    }
    this.currentSound = selectedSound;
    this.audio.src = `../../../assets/musics/${selectedSound}.mp3`;
    this.audio.load();
    this.audio.controls = true;
    this.audio.loop = true;
    await this.audio.play();
  }
  get soundsTitles(): string[]{
    return this.soundTitles;
  }
  public pauseAudio(): void {
    this.audio.pause();
  }
  public stopAudio(): void {
    this.pauseAudio();
    this.audio.currentTime = 0;
  }
  public setAudioVolume(level: number): void{
    this.audio.volume = level;
  }
}
