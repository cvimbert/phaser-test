import { ObjectContainer } from './object-container.class';

export class PhaserObjectContainer extends ObjectContainer {

    private originDisplayer: Phaser.GameObjects.Container;
    private linkDisplayer: Phaser.GameObjects.Container;
    private linkGraphics: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, id?: string, xInit?: number, yInit?: number) {
        super(scene, id, xInit, yInit)
    }

    render() {
        if (this.originDisplayer) {
            this.applyTransformsTo(this.originDisplayer);
        }

        super.render();

        this.drawLink();
    }

    displayLinkToParent() {

        if (!this.parentContainer) {
            return;
        }

        this.linkDisplayer = this.scene.add.container(0, 0);

        this.linkGraphics = this.scene.add.graphics({
            lineStyle: {
                color: 0x000000,
                width: 3
            }
        });

        this.linkDisplayer.add(this.linkGraphics);
        this.drawLink();
    }

    addChildContainer(x: number, y: number, id?: string) {
        let container = new PhaserObjectContainer(this.scene, id, x, y);

        super.addChildContainer(container.super, x, y, id);
    }

    displayLinks(recursive = false) {
        this.childrenObjects.forEach(obj => {
            (<PhaserObjectContainer>obj).displayLinkToParent();
        });

        this.displayLinkToParent();
    }

    drawLink() {
        if (this.linkGraphics) {
            this.linkGraphics.clear();
            this.linkGraphics.lineBetween(this.absoluteX, this.absoluteY, this.parentContainer.absoluteX, this.parentContainer.absoluteY);
        }
    }

    displayOrigin() {
        this.originDisplayer = this.scene.add.container(0, 0);

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
    }
}