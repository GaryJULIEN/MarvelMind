import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { PlayingComponent } from './playing/playing.component';
import { PreselectionComponent } from './preselection/preselection.component';

@NgModule({
  declarations: [GameComponent, PlayingComponent, PreselectionComponent],
  imports: [CommonModule, GameRoutingModule]
})
export class GameModule { }
