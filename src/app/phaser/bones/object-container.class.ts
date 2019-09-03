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
        this.originDisplayer = this.scene.add.container(50, 50);

        let graph = this.scene.add.graphics({
            lineStyle: {
                color: 0x0000ff,
                width: 2
            },
            fillStyle: {
                color: 0x0000ff
            }
        });

        this.originDisplayer.add(graph);
        graph.fillCircle(0, 0, 5);
        graph.lineBetween(-10, 0, 10, 0);
        graph.lineBetween(0, -10, 0, 10);
    }


}