import { Component, OnInit, Input } from '@angular/core';
import { ObjectContainer } from '../phaser/bones/object-container.class';
import { NodeEditorService } from '../node-editor.service';

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss']
})
export class NodeEditorComponent implements OnInit {

  @Input("nodeContainer") container: ObjectContainer;

  movementFactor = 10;

  constructor(
    public editorService: NodeEditorService
  ) { }

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
