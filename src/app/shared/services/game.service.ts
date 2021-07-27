import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IHeroe } from '../models/heroe';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  public start = new BehaviorSubject<boolean>(false);
  public selectedHeroe: IHeroe | null = null;
  public colorsList = ['#FFC300', '#F0131E', '#001EF9', '#24C14D'];
  private secretSuit: string[] = [];
  constructor() {}
  public setSelectedHeroe(heroe: IHeroe): void {
    this.selectedHeroe = heroe;
  }
  public generateRandomSuit(): void {
    const secretSuit = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * 4);
      secretSuit.push(this.colorsList[randomIndex]);
    }
    this.secretSuit = secretSuit;
  }
  public compareSuit(suit: string[]): string[] {
    const result: string[] = [];
    const cloneSecret = [...this.secretSuit];
    const cloneSuit = [...suit];
    // Get good and same place
    for (const [iterator, color] of cloneSuit.entries()) {
      if (color === cloneSecret[iterator]) {
        result.push('green');
        cloneSuit[iterator] = '#fff';
        cloneSecret[iterator] = '#000';
      }
    }
    // Get present but not same place
    for (const [indexSuitItem, color] of cloneSuit.entries()) {
      if (cloneSecret.includes(color)) {
        const indexSecretItem = cloneSecret.findIndex(secretColor => secretColor === color);
        result.push('orange');
        cloneSecret[indexSecretItem] = '#000';
        cloneSuit[indexSuitItem] = '#fff';
      }
    }
    return result.length ? result : ['no match'];
  }

}
