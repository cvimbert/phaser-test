export class Bone {
    
    x: number;
    y: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    visibility: boolean;

    constructor() {

    }

    set scale(value: number) {
        this.scaleX = value;
        this.scaleY = value;
    }

    render() {
        
    }
}