import { Transformable } from '../interfaces/transformable.interface';
import { BoneNode } from './bone-node.class';

export class ObjectContainer {

    initAngle: number;
    hypothenus: number;

    xPos: number = 0;
    yPos: number = 0;

    relativeRotation: number = 0;

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
        this.xPos = xInit;
        this.yPos = yInit;

        if (object) {
            object.x = xInit;
            object.y = yInit;
        }

        //console.log("là");
        
        this.calculateInitAngleAndHypothenus();
    }

    calculateInitAngleAndHypothenus() {
        
        
        this.initAngle = this.xPos !== 0 ? Math.atan(this.yPos / this.xPos) : 0;

        if (this.xPos < 0) {
            this.initAngle += Math.PI;
        }

        this.hypothenus = Math.sqrt(Math.pow(this.xPos, 2) + Math.pow(this.yPos, 2));

        //  console.log("ia", this.id, this.initAngle, this.hypothenus);
        // console.log(this.id, this.initAngle, this.hypothenus);
    }

    // Valeur relative de x
    set x(value: number) {
        this.xPos = value;

        // calcul du nouvel angle de départ
        this.calculateInitAngleAndHypothenus();
    }

    get x(): number {
        return this.relativeX;
    }

    get relativeX(): number {
        // console.log("-->", this.id, this.parentContainer ? Math.cos(this.initAngle - this.parentContainer.relativeRotation) * this.hypothenus : this.xPos);
        
        return this.parentContainer ? Math.cos(this.initAngle - this.parentContainer.relativeRotation) * this.hypothenus : this.xPos;
    }

    get relativeY(): number {
        return this.parentContainer ? Math.sin(this.initAngle - this.parentContainer.relativeRotation) * this.hypothenus : this.yPos;
    }

    get absoluteX(): number {
        // console.log(this.id, "relX", this.relativeX);
        
        return this.relativeX + (this.parentContainer ? this.parentContainer.absoluteX : 0);
    };

    get absoluteY(): number {
        return this.relativeY + (this.parentContainer ? this.parentContainer.absoluteY : 0);
    }

    // Valeur relative de y
    set y(value: number) {
        this.yPos = value;

        // calcul du nouvel angle de départ
        this.calculateInitAngleAndHypothenus();
    }

    get y(): number {
        return this.relativeY;
    }

    set rotation(value: number) {
        // console.log("Nouvelle rotation", value);
        
        this.relativeRotation = value;
    }

    get absoluteRotation(): number {
        // console.log(this.relativeRotation);
        
        return this.relativeRotation + (this.parentContainer ? this.parentContainer.absoluteRotation : 0);
    }

    get rotation(): number {
        return this.relativeRotation;
    }

    render() {
        // console.log("render", this.id);
        
        if (this.object) {
            // console.log("Apply transforms to object", this.id);
            
            this.applyTransformsTo(<Transformable>this.object);
        }

        if (this.originDisplayer) {
            this.applyTransformsTo(this.originDisplayer);
        }
    }

    applyTransformsTo(obj: Transformable) {
        obj.x = this.absoluteX;
        obj.y = this.absoluteY;
        obj.rotation = -this.absoluteRotation;
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