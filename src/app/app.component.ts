//declare var Phaser = require("phaser");
import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Game, Scene } from 'phaser';
import { TestScene } from './phaser/test-scene.class';
import { ObjectContainer } from './phaser/bones/object-container.class';
import { NodeEditorService } from './node-editor.service';
import { EditionMode } from './enums/edition-mode.enum';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(

  ) {

  }

  ngOnInit() {

  }
}
