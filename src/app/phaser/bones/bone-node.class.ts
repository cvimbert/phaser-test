export class BoneNode {

    rotation: number = 0;
    childrenObjects: Phaser.GameObjects.Sprite[] = [];

    constructor(
        public x: number = 0,
        public y: number = 0
    ) {

    }

    render() {
        this.childrenObjects.forEach(obj => {

        });
    }

    addChild(child: Phaser.GameObjects.Sprite) {
        this.childrenObjects.push(child);
    }

    removeChild(child: Phaser.GameObjects.Sprite) {
        let index = this.childrenObjects.indexOf(child);

        if (index !== -1) {
            this.childrenObjects.splice(index, 1);
        }
    }
}