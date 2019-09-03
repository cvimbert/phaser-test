import { Transformable } from '../interfaces/transformable.interface';
import { BoneNode } from './bone-node.class';

export class ObjectContainer {

    initAngle: number;
    hypothenus: number;

    private originDisplayer: Phaser.GameObjects.Container;

    constructor(
        private scene?: Phaser.Scene,
        public id?: string,
        public x?: number,
        public y?: number,
        public rotation?: number,
        public object?: BoneNode | Transformable
    ) {
        this.initAngle = Math.atan(this.y / this.x);
        this.hypothenus = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));

        this.displayOrigin();
    }


    displayOrigin() {
        this.originDisplayer = this.scene.add.container(0, 0);

        let graph = this.scene.add.graphics({
            lineStyle: {
                color: 0x0000ff,
                width: 1
            },
            fillStyle: {
                color: 0xff0000
            }
        });

        this.originDisplayer.add(graph);
        graph.fillCircle(100, 100, 5);

        let line = new Phaser.Geom.Line(-20, 0, 20, 0);
        graph.strokeLineShape(line);
    }


}