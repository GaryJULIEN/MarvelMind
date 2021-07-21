import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { GameService } from '../../shared/services/game.service';
import { AudioService } from '../../shared/services/audio.service';
import {IHeroe} from '../../shared/models/heroe';

@Component({
  selector: 'app-preselection',
  templateUrl: './preselection.component.html',
  styleUrls: ['./preselection.component.scss']
})
export class PreselectionComponent implements OnInit {

  public heroesList: IHeroe[] = [
    {
      name: 'Wonder Woman',
      pathLabel: `wonderwoman.jpg`,
      selected: false
    },
    {
      name: 'Hulk',
      pathLabel: `hulk.jpg`,
      selected: false
    },
    {
      name: 'Captain America',
      pathLabel: `captain_america.jpg`,
      selected: false
    },
    {
      name: 'Spiderman',
      pathLabel: `spiderman.png`,
      selected: false
    }
  ];
  constructor( private router: Router, private gameService: GameService, private audioService: AudioService) {}
  ngOnInit(): void {
  }
  public launchGame(): void {
    const selectedHeroe = this.getSelectedHeroe();
    if (!selectedHeroe) {
      alert('Veuillez sélectionner un héro avant de continuer ! 🦸‍♀️🦸‍♂️');
      return;
    }
    this.gameService.selectedHeroe = selectedHeroe;
    this.audioService.stopAudio();
    this.router.navigate(['playing']);
    return;
  }
  public selectHeroe(heroe: IHeroe): void{
    this.heroesList.map( h => h.selected = false);
    heroe.selected = true;
  }
  private getSelectedHeroe(): IHeroe {
    return this.heroesList.filter(h => h.selected)[0];
  }

}
