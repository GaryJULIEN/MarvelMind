import {Component, OnDestroy, OnInit} from '@angular/core';
import {AudioService} from './shared/services/audio.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  public menu = true;
  protected destroy$ = new Subject<boolean>();
  title = 'MarvelMind';

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.canPlaySound.pipe(takeUntil(this.destroy$)).subscribe(async (canPlay) => {
      if (canPlay) {
        await this.audioService.playSound(1);
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  public selectItem(): void {
    this.menu = false;
  }
}
