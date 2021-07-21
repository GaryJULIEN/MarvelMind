import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from './audio.service';
import { GameService } from './game.service';

@NgModule({
  imports: [CommonModule]
})
export class ServicesModule {
  static forRoot(): ModuleWithProviders<any> {
    return  {
      ngModule: ServicesModule,
      providers: [
        AudioService,
        GameService
      ]
    };
  }
}
