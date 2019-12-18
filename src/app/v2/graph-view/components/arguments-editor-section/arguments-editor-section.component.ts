import { Component, OnInit, Input } from '@angular/core';
import { Argument } from '../../interfaces/argument.interface';
import { ArgumentType } from '../../argument-type.class';
import { ArgumentValue } from '../../argument-value.class';

@Component({
  selector: 'arguments-editor-section',
  templateUrl: './arguments-editor-section.component.html',
  styleUrls: ['./arguments-editor-section.component.scss']
})
export class ArgumentsEditorSectionComponent implements OnInit {

  @Input() arg: Argument;
  selectedType: string;
  value: any;
  argTypes: string | string[];

  constructor() { }

  ngOnInit() {
    if (typeof this.arg.type === "function") {
      this.argTypes = this.arg.type();
    } else {
      this.argTypes = this.arg.type;
    }

    if (Array.isArray(this.argTypes)) {
      this.selectedType = this.argTypes[0];
    } else {
      this.selectedType = this.argTypes === ArgumentType.ALL ? ArgumentType.STRING : this.argTypes;
    }

    this.select(this.selectedType);
  }

  select(type: string) {
    if (type !== this.selectedType) {      
      switch (type) {
        case ArgumentType.STRING:
          this.value = "";
          break;
  
        case ArgumentType.NUMBER:
          this.value = 0;
          break;
  
        case ArgumentType.BOOLEAN:
          this.value = "true";
          break;
      }
    }

    this.selectedType = type;
  }

  isOfType(type: string): boolean {
    if (Array.isArray(this.argTypes)) {
      return this.argTypes.indexOf(type) !== -1;
    } else {
      if (this.argTypes === ArgumentType.ALL) {
        return true;
      } else {
        return this.argTypes === type;
      }
    }
  }

  getValue(): any {
    switch (this.selectedType) {
      case ArgumentType.STRING:
      case ArgumentType.NUMBER:
        return this.value;

      case ArgumentType.BOOLEAN:
        return this.value === "true";
    }
  }

  getArgumentValue(): ArgumentValue {
    let argValue = new ArgumentValue();
    argValue.id = this.arg.id;
    argValue.value = this.getValue();
    argValue.type = this.selectedType;
    return argValue;
  }
}
