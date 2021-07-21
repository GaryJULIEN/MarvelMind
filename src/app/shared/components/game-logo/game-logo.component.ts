import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { GameService } from '../../services/game.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-game-logo',
  templateUrl: './game-logo.component.html',
  styleUrls: ['./game-logo.component.scss']
})
export class GameLogoComponent implements OnInit, OnDestroy {
  @Input() loaded = false;
  protected destroy$ = new Subject<boolean>();
  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.start.pipe(takeUntil(this.destroy$)).subscribe( start => {
      if (start) {
        this.loaded = true;
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
