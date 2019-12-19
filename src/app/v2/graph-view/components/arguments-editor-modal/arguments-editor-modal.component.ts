import { Component, OnInit, Inject, ViewChildren, QueryList } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArgumentValue } from '../../argument-value.class';
import { Argument } from '../../interfaces/argument.interface';
import { ArgumentsEditorSectionComponent } from '../arguments-editor-section/arguments-editor-section.component';

@Component({
  selector: 'app-arguments-editor-modal',
  templateUrl: './arguments-editor-modal.component.html',
  styleUrls: ['./arguments-editor-modal.component.scss']
})
export class ArgumentsEditorModalComponent implements OnInit {

  @ViewChildren("section") sections: QueryList<ArgumentsEditorSectionComponent>;
  arguments: { [key: string]: Argument };
  argumentsArray: Argument[] = [];

  constructor(
    private dialogRef: MatDialogRef<ArgumentsEditorModalComponent, ArgumentValue[]>,
    @Inject(MAT_DIALOG_DATA) public data: Object
  ) {
    this.arguments = data["arguments"];
  }

  ngOnInit() {
    for (let key in this.arguments) {
      this.arguments[key].id = key;
      this.argumentsArray.push(this.arguments[key]);
    }
  }

  validate() {
    let values = this.sections.map(section => section.getArgumentValue());
    this.dialogRef.close(values);
  }
}
