import { Component, OnInit, Input } from '@angular/core';
import { ObjectContainer } from '../phaser/bones/object-container.class';

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss']
})
export class NodeEditorComponent implements OnInit {

  @Input("nodeContainer") container: ObjectContainer;

  movementFactor = 10;

  constructor() { }

  ngOnInit() {
  }

  onChanged(newValue: number) {
    this.container.render();
  }

  moveContainer(x: number, y: number) {
    this.container.x += x * this.movementFactor;
    this.container.y += y * this.movementFactor;
    this.container.render();
  }

  onRotationChanged(value: number) {
    //this.container.rotation = value;
    this.container.render();
  }

}
