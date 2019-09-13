import { Transformable } from '../interfaces/transformable.interface';

export class ObjectContainer {

    initAngle: number;
    hypothenus: number;

    xPos: number = 0;
    yPos: number = 0;

    relativeRotation: number = 0;

    debugColor: number = 0x000000;

    private originDisplayer: Phaser.GameObjects.Container;
    private linkDisplayer: Phaser.GameObjects.Container;
    private linkGraphics: Phaser.GameObjects.Graphics;
    private originGraphics: Phaser.GameObjects.Graphics;

    childrenObjects: ObjectContainer[] = [];
    childrenObjectsById: { [key: string]: ObjectContainer } = {};

    parentContainer: ObjectContainer;

    constructor(
        protected scene?: Phaser.Scene,
        public id?: string,
        xInit?: number,
        yInit?: number,
        private object?: Transformable
    ) {
        this.xPos = xInit;
        this.yPos = yInit;

        if (object) {
            object.x = xInit;
            object.y = yInit;
        }
        
        this.calculateInitAngleAndHypothenus();
    }

    calculateInitAngleAndHypothenus() {
        
        this.initAngle = this.xPos !== 0 ? Math.atan(this.yPos / this.xPos) : Math.PI / 2;

        if (this.xPos < 0) {
            this.initAngle += Math.PI;
        }

        this.hypothenus = Math.sqrt(Math.pow(this.xPos, 2) + Math.pow(this.yPos, 2));
    }

    // Valeur relative de x
    set x(value: number) {
        this.xPos = value;

        // console.log(this.id, "set", value);

        // calcul du nouvel angle de départ
        this.calculateInitAngleAndHypothenus();
    }

    get x(): number {
        // console.log(this.id, "get", this.relativeX);
        
        return this.relativeX;
    }

    get relativeX(): number {
        // if (this.id == "node2")
        //     console.log("-->", this.id, this.parentContainer ? Math.cos(this.initAngle - this.parentContainer.relativeRotation) * this.hypothenus : this.xPos);
        
        return this.parentContainer ? Math.cos(this.initAngle - this.parentContainer.absoluteRotation) * this.hypothenus : this.xPos;
    }

    get relativeY(): number {
        return this.parentContainer ? Math.sin(this.initAngle - this.parentContainer.absoluteRotation) * this.hypothenus : this.yPos;
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
        this.relativeRotation = value;
    }

    get absoluteRotation(): number {  
        return this.relativeRotation + (this.parentContainer ? this.parentContainer.absoluteRotation : 0);
    }

    get rotation(): number {
        return this.relativeRotation;
    }

    displayLinks(visibility = true, isRoot = true) {
        this.childrenObjects.forEach(obj => {
            if (obj.object === undefined) {
                obj.displayLinks(visibility, false);
            }
        });

        if (!isRoot) {
            this.displayLinkToParent(visibility);
        }
    }

    addChild(child: Transformable, id?: string): ObjectContainer {

        let container = new ObjectContainer(this.scene, id, child.x, child.y, child);

        container.parentContainer = this;

        this.childrenObjects.push(container);

        if (id) {
            this.childrenObjectsById[id] = container;
        }

        return container;
    }

    addChildContainer(child: ObjectContainer, id?: string) {

        child.parentContainer = this;

        this.childrenObjects.push(child);

        if (id) {
            this.childrenObjectsById[id] = child;
        }
    }

    render() {
        // console.log("render", this.id);
        
        if (this.object) {
            // console.log(this.id, this.object);
            
            this.applyTransformsTo(<Transformable>this.object);
        }

        if (this.originDisplayer) {
            this.applyTransformsTo(this.originDisplayer);
        }

        this.childrenObjects.forEach(obj => {
            obj.render();
        });

        this.drawLink();
    }

    applyTransformsTo(obj: Transformable) {
        obj.x = this.absoluteX;
        obj.y = this.absoluteY;
        obj.rotation = -this.absoluteRotation;
    }

    displayLinkToParent(visibility = true) {

        if (!this.parentContainer) {
            return;
        }

        if (visibility) {
            if (!this.linkDisplayer) {
                this.linkDisplayer = this.scene.add.container(0, 0);
            }

            this.linkGraphics = this.scene.add.graphics({
                lineStyle: {
                    color: 0x000000,
                    width: 3
                },
                fillStyle: {
                    color: 0x000000
                }
            });
    
            this.linkDisplayer.add(this.linkGraphics);
            this.drawLink();
        } else {
            if (this.linkDisplayer && this.linkGraphics) {
                this.linkDisplayer.remove(this.linkGraphics);
                this.linkGraphics = null;
            }
        }
    }
    
    drawLink() {
        if (this.linkGraphics) {
            this.linkGraphics.clear();
            this.linkGraphics.lineBetween(this.absoluteX, this.absoluteY, this.parentContainer.absoluteX, this.parentContainer.absoluteY);
            this.linkGraphics.fillCircle(this.absoluteX, this.absoluteY, 4);
        }
    }

    displayOrigin(visibility = true) {

        if (visibility) {
            if (!this.originDisplayer) {
                this.originDisplayer = this.scene.add.container(0, 0);
            }
    
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
    
            this.originGraphics = graph;

            this.originDisplayer.x = this.absoluteX;
            this.originDisplayer.y = this.absoluteY;
        } else {
            if (this.originDisplayer && this.originGraphics) {
                this.originDisplayer.remove(this.originGraphics);
                this.originGraphics = null;
            }
        }
    }
}