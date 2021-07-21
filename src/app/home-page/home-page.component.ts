import { Component, OnInit } from '@angular/core';
import {AudioService} from '../shared/services/audio.service';
import {GameService} from '../shared/services/game.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private audioService: AudioService, private gameService: GameService) { }

  ngOnInit(): void {
  }
   public start(): void {
    this.audioService.canPlaySound.next(true);
    this.gameService.start.next(true);
   }

}
