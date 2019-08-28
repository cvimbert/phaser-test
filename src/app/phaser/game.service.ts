import { Injectable, OnInit } from '@angular/core';
import { Scene, Game } from 'phaser';

@Injectable({
  providedIn: 'root'
})
export class GameService extends Scene implements OnInit {

  

  constructor() {

    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 200 }
          }
      },
      scene: {
          //preload: this.preload,
          //create: this.create
      }
    }; 

    super(config);
  }

  preload() {
    
    this.load.image("", "");
  }

  ngOnInit() {
    this.game = new Game()
  }
}
