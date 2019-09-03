import { Transformable } from '../interfaces/transformable.interface';
import { BoneNode } from './bone-node.class';

export class ObjectContainer {

    initAngle: number;
    hypothenus: number;

    relativeX: number = 0;
    relativeY: number = 0;

    absoluteX: number = 0;
    absoluteY: number = 0;

    private _rotation: number = 0;

    absoluteRotation: number = 0;

    private originDisplayer: Phaser.GameObjects.Container;

    constructor(
        private scene?: Phaser.Scene,
        public id?: string,
        xInit?: number,
        yInit?: number,
        public object?: BoneNode | Transformable,
        public parentNode?: BoneNode
    ) {
        this.initAngle = Math.atan(yInit / xInit);
        this.hypothenus = Math.sqrt(Math.pow(xInit, 2) + Math.pow(yInit, 2));

        this.relativeX = xInit;
        this.relativeY = yInit;

        this.displayOrigin();
    }

    // Valeur relative de x
    set x(value: number) {
        this.relativeX = value;

        // calcul de absoluteX
        
    }

    get x(): number {
        return this.relativeX;
    }

    // Valeur relative de y
    set y(value: number) {
        this.relativeY = value;
    }

    get y(): number {
        return this.relativeY;
    }

    set rotation(value: number) {
        this._rotation = value;

        // update des positions relatives

    }

    get rotation(): number {
        return this._rotation;
    }

    render() {
        this.object.x = this.absoluteX;
        this.object.y = this.absoluteY;
        this.object.rotation = this.absoluteRotation;

        if (this.originDisplayer) {
            this.originDisplayer.x = this.absoluteX;
            this.originDisplayer.y = this.absoluteY;
            this.originDisplayer.rotation = this.absoluteRotation;
        }
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