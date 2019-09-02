import { BoneNode } from '../bones/bone-node.class';

export interface ChildObjectData {
    id?: string;
    x: number;
    y: number;
    rotation: number;
    object: Phaser.GameObjects.Sprite | BoneNode;

    // pas bien nommé
    initAngle: number;

    hypothenus: number;
}