import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogoComponent } from './game-logo/game-logo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GameLogoComponent
  ],
  exports: [
    GameLogoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule {}
