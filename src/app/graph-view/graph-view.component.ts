import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { GraphScene } from '../v2/graph-view/graph-scene.class';
import { Game } from 'phaser';
import { BaseItemData } from '../v2/graph-view/interfaces/base-item-data.interface';
import { GraphService } from '../v2/graph-view/services/graph.service';
import { BaseGraphItemComponent } from '../v2/graph-view/components/base-graph-item/base-graph-item.component';
import { Point } from '../v2/interfaces/point.interface';

@Component({
  selector: 'app-graph-view',
  templateUrl: './graph-view.component.html',
  styleUrls: ['./graph-view.component.scss']
})
export class GraphViewComponent implements OnInit {

  @ViewChild("canvasElement") canvasElement: ElementRef;
  @ViewChildren("itemComponent") itemComponents: QueryList<BaseGraphItemComponent>;

  graphScene: GraphScene;
  game: Game;

  testLinks = [
    {
      from: {
        item: "it1",
        anchor: "out2"
      },
      to: {
        item: "it2",
        anchor: "in1"
      }
    },
    {
      from: {
        item: "it1",
        anchor: "out1"
      },
      to: {
        item: "it3",
        anchor: "in1"
      }
    },
    {
      from: {
        item: "it2",
        anchor: "out1"
      },
      to: {
        item: "it4",
        anchor: "in1"
      }
    },
    {
      from: {
        item: "it3",
        anchor: "out1"
      },
      to: {
        item: "it4",
        anchor: "in1"
      }
    }
  ];

  testItems: { [key: string]: BaseItemData } = {
    it1: {
      position: {
        x: 100,
        y: 100
      },
      anchors: {
        in1: {
          x: 0,
          y: 50
        },
        out1: {
          x: 100,
          y: 20
        },
        out2: {
          x: 100,
          y: 80
        }
      }
    },
    it2: {
      position: {
        x: 450,
        y: 300
      },
      anchors: {
        in1: {
          x: 0,
          y: 50
        },
        out1: {
          x: 100,
          y: 20
        },
        out2: {
          x: 100,
          y: 80
        }
      }
    },
    it3: {
      position: {
        x: 450,
        y: 30
      },
      anchors: {
        in1: {
          x: 0,
          y: 50
        },
        out1: {
          x: 100,
          y: 20
        },
        out2: {
          x: 100,
          y: 80
        }
      }
    },
    it4: {
      position: {
        x: 700,
        y: 130
      },
      anchors: {
        in1: {
          x: 0,
          y: 50
        },
        out1: {
          x: 100,
          y: 20
        },
        out2: {
          x: 100,
          y: 80
        }
      }
    }
  };

  items: BaseItemData[];

  constructor(
    private graphService: GraphService
  ) { }

  ngOnInit() {
    this.graphScene = new GraphScene();
    this.graphService.scene = this.graphScene;

    let config: Phaser.Types.Core.GameConfig = {
      type: Phaser.WEBGL,
      width: 1024,
      height: 600,
      scale: {
        mode: Phaser.Scale.NONE
      },
      scene: this.graphScene,
      backgroundColor: '#ffffff',
      parent: this.canvasElement.nativeElement
    }; 

    this.items = [];

    for (let key in this.testItems) {
      let item = this.testItems[key];
      item.id = key;
      this.items.push(item);
    }

    this.game = new Game(config);

    // en attendant mieux
    setTimeout(() => {
      this.createLinks();
      this.drawAllLinks();
    });
  }

  createLinks() {
    this.testLinks.forEach(link => {
      this.graphService.createLink(link["from"], link["to"]);
    });
  }

  drawAllLinks() {
    this.graphService.links.forEach(link => {
        link.drawLink();
    });
  }

  resetPositions() {

  }

  savePositions() {
    let positions: { [key: string]: Point } = {};

    this.itemComponents.forEach(item => {
      positions[item.data.id] = item.currentPos;
    });

    // console.log(JSON.stringify(positions));
  }
}
