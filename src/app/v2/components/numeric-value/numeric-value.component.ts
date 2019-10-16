import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { InspectionService } from '../../services/inspection.service';
import { TransformationNode } from '../../transformation-node.class';

@Component({
  selector: 'numeric-value',
  templateUrl: './numeric-value.component.html',
  styleUrls: ['./numeric-value.component.scss']
})
export class NumericValueComponent implements OnInit {

  @Input() value: number;
  @Input() name: string;
  @Input() node: TransformationNode;
  @Input() propertyName: string;

  initValue: number;

  @ViewChild("editionInput") editionInput: ElementRef;

  editionMode = false;

  constructor(
    private ref: ChangeDetectorRef,
    private element: ElementRef,
    private inspectionService: InspectionService
  ) { }

  ngOnInit() {
  }

  /* set localValue(value: number) {
    this.value = value;


    // attention, pas correct... valide uniquement dans le cas d'une rotation relative
    console.log(this.inspectionService.selectedNode);
    
    this.inspectionService.selectedNode.applyRelativeRotation();
    this.inspectionService.selectedNode.render();
  }

  get localValue(): number {
    return this.value;
  } */

  onValueChange() {
    this.node[this.propertyName] = this.value;

    console.log(this.propertyName, this.inspectionService.selectedNode);
    this.inspectionService.selectedNode.applyRelativeRotation();
    this.inspectionService.selectedNode.render();
  }

  setEditionMode() {
    if (!this.editionMode) {
      this.editionMode = true;
      this.initValue = this.value;
  
      setTimeout(() => {
        if (this.editionInput) {
          this.editionInput.nativeElement.focus();
        }
      });
    }
  }

  // à voir plus tard, pas urgent
  /* @HostListener('window:click', ['$event'])
  onClick(evt: MouseEvent) {
    if (this.editionMode) {
      
      
      if (!this.element.nativeElement.contains(evt.target)) {
        console.log(this.element.nativeElement);
        
        console.log(evt.target);
        console.log("yes");
        
        this.editionMode = false;
      }
    }
  } */

  @HostListener('window:keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    switch (evt.key) {
      case "Escape":        
        if (this.editionMode) this.value = this.initValue;
        this.ref.detectChanges();
      case "Enter":
        this.editionMode = false;
        break;
    }
  }
}
