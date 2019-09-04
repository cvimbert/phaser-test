import { Transformable } from '../interfaces/transformable.interface';
import { BoneNode } from './bone-node.class';

export class ObjectContainer {

    initAngle: number;
    hypothenus: number;

    relativeX: number = 0;
    relativeY: number = 0;

    absoluteX: number = 0;
    absoluteY: number = 0;

    private localRotation: number = 0;

    absoluteRotation: number = 0;

    debugColor: number = 0xff0000;

    private originDisplayer: Phaser.GameObjects.Container;

    constructor(
        protected scene?: Phaser.Scene,
        public id?: string,
        xInit?: number,
        yInit?: number,
        public object?: BoneNode | Transformable,
        public parentContainer?: ObjectContainer
    ) {
        this.relativeX = xInit;
        this.relativeY = yInit;

        if (object) {
            object.x = xInit;
            object.y = yInit;
        }

        this.calculateInitAngleAndHypothenus();
    }

    calculateInitAngleAndHypothenus() {
        this.initAngle = Math.atan(this.relativeY / this.relativeX);
        this.hypothenus = Math.sqrt(Math.pow(this.relativeX, 2) + Math.pow(this.relativeY, 2));
    }

    // Valeur relative de x
    set x(value: number) {
        this.relativeX = value;

        // calcul de la position absolue sur x
        this.absoluteX = this.relativeX + (this.parentContainer ? this.parentContainer.absoluteX : 0);

        // calcul du nouvel angle de départ
        this.calculateInitAngleAndHypothenus();
    }

    get x(): number {
        return this.relativeX;
    }

    // Valeur relative de y
    set y(value: number) {
        this.relativeY = value;

        // calcul de la position absolue sur y
        this.absoluteY = this.relativeY + (this.parentContainer ? this.parentContainer.absoluteY : 0);

        // calcul du nouvel angle de départ
        this.calculateInitAngleAndHypothenus();
    }

    get y(): number {
        return this.relativeY;
    }

    set rotation(value: number) {
        this.localRotation = value;

        // update des positions relatives
        let angle = this.initAngle - this.localRotation;
        this.relativeX = Math.cos(angle) * this.hypothenus;
        this.relativeY = Math.sin(angle) * this.hypothenus;

        this.absoluteRotation = this.localRotation + (this.parentContainer ? this.parentContainer.absoluteRotation : 0);
    }

    get rotation(): number {
        return this.localRotation;
    }

    render() {
        this.applyTransformsTo(<Transformable>this.object);

        if (this.originDisplayer) {
            this.applyTransformsTo(this.originDisplayer);
        }
    }

    applyTransformsTo(obj: Transformable) {
        obj.x = this.absoluteX;
        obj.y = this.absoluteY;
        obj.rotation = this.absoluteRotation;
    }

    displayOrigin() {
        this.originDisplayer = this.scene.add.container(50, 50);

        let graph = this.scene.add.graphics({
            lineStyle: {
                color: this.debugColor,
                width: 2
            },
            fillStyle: {
                color: this.debugColor
            }
        });

        this.originDisplayer.add(graph);
        graph.fillCircle(0, 0, 5);
        graph.lineBetween(-10, 0, 10, 0);
        graph.lineBetween(0, -10, 0, 10);

        //this.originDisplayer.blendMode = Phaser.BlendModes.MULTIPLY;
    }


}