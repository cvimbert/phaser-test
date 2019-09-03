import { Transformable } from '../interfaces/transformable.interface';

export class ObjectContainer {

    id: string;

    x: number;
    y: number;
    rotation: number;

    initAngle: number;
    hypothenus: number;

    object: Transformable;

    constructor(
        private scene?: Phaser.Scene
    ) {
        
    }


}