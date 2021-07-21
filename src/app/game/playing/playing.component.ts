import { Component, OnInit } from '@angular/core';
import {IHeroe} from '../../shared/models/heroe';
import {GameService} from '../../shared/services/game.service';
import {AudioService} from '../../shared/services/audio.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {
  public heroe: IHeroe | null = null;
  public timeInSeconds = 0;
  public time = {
    seconds: 0,
    minutes: 0
  };
  public winner = false;
  public colorsList: string[] = [];
  public tries: {win: boolean; colorsItem: string[], results: string[]}[] = [];
  public selectedColor = '';
  public finishDisclaimer = '';
  private timeIterval: any;
  public currentTryTime = 0;
  private maxTries = 12;
  constructor(private gameService: GameService, private audioService: AudioService) { }

  ngOnInit(): void {
    this.audioService.playSound(0);
    this.startGame();
  }

  /**
   * Increment current try time and returns it
   */
  public incrementCurrentTryTime(): number{
    return ++this.currentTryTime;
  }

  /**
   * Select color
   */
  public selectColor(color: string): void {
    this.selectedColor = color;
  }

  /**
   * Set color of a line item
   */
  public setColor(lineIndex: number, itemIndex: number): void {
    if (this.currentTryTime !== lineIndex) {
      alert('Jouez sur la bonne ligne ! Indice: c\'est la ' + (this.currentTryTime + 1));
    }
    if (this.selectedColor === '') {
      alert('Vous devez d\'abord choisr une couleur');
    }
    if (this.currentTryTime !== lineIndex || this.selectedColor === '') {
      return;
    }
    this.tries[lineIndex].colorsItem[itemIndex] = this.selectedColor;
  }

  /**
   * Compare suit with secret suit
   */
  public compareSuits(): void {
    const trySuit = this.tries[this.currentTryTime].colorsItem;

    if (trySuit.includes('#fff')) {
      alert('Vous devez selectionner 4 couleurs');
      return;
    }
    this.incrementCurrentTryTime();
    if (this.currentTryTime  <= this.maxTries) {

      const results = this.gameService.compareSuit(trySuit);
      this.tries[this.currentTryTime - 1].results = results;
      const winner = results && results.length === 4 && results.every( color => color === 'green');
      if (winner) {
        this.finishGame(winner);
      }
      if (this.currentTryTime === this.maxTries) {
        this.finishGame();
      }
    } else {
        this.finishGame();
    }
  }

  /**
   * Start a game
   */
  private startGame(): void {
    this.heroe = this.gameService.selectedHeroe;
    this.colorsList = this.gameService.colorsList;
    this.gameService.generateRandomSuit();
    this.launchTime();
    this.setTries();
  }

  /**
   * Launch time for the current game
   */
  private launchTime(): void {
    this.timeIterval = setInterval(() => {
      this.timeInSeconds++;
      this.time.seconds = this.timeInSeconds % 60;
      this.time.minutes = Math.trunc(this.timeInSeconds / 60);
    }, 1000);
  }

  /**
   * Finish a game
   */
  private finishGame(winner = false): void {
    this.timeInSeconds = 0;
    this.time = {
        seconds: 0,
        minutes: 0
      };
    this.winner = false;
    this.colorsList = [];
    this.tries = [];
    this.selectedColor = '';
    this.finishDisclaimer = '';
    this.currentTryTime = 0;
    if (winner) {
      alert('Gagné');
    } else {
      alert('Perdu');
    }
    clearInterval(this.timeIterval);
    // Todo: deplacer cette startGame() a l'appui d'un bouton
    this.startGame();
  }

  /**
   * Set tries array
   */
  private setTries(): void {
    for (let i = 0; i < this.maxTries; i++) {
      const colorsItem = [];
      for (let j = 0; j < 4; j++) {
        colorsItem.push('#fff');
      }
      this.tries.push({
        win : false,
        results: [],
        colorsItem
      });
    }
  }

}
