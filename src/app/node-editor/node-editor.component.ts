import { Component, OnInit, Input } from '@angular/core';
import { ObjectContainer } from '../phaser/bones/object-container.class';

@Component({
  selector: 'app-node-editor',
  templateUrl: './node-editor.component.html',
  styleUrls: ['./node-editor.component.scss']
})
export class NodeEditorComponent implements OnInit {

  @Input("nodeContainer") container: ObjectContainer;

  constructor() { }

  ngOnInit() {
  }

  onChanged(newValue: number) {
    this.container.render();
  }

}
